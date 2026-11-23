import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AssistantComponent } from './assistant.component';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';

describe('AssistantComponent', () => {
  let component: AssistantComponent;
  let fixture: ComponentFixture<AssistantComponent>;
  let assistantService: AiAssistantService;
  let toastService: ToastService;
  let i18nService: I18nService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        AiAssistantService,
        ToastService,
        I18nService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantComponent);
    component = fixture.componentInstance;
    assistantService = TestBed.inject(AiAssistantService);
    toastService = TestBed.inject(ToastService);
    i18nService = TestBed.inject(I18nService);
    i18nService.setLanguage('es');
    fixture.detectChanges();
  });

  it('should create the assistant component', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with badge, 3D robot image and title', () => {
    const el = fixture.nativeElement as HTMLElement;
    const badge = el.querySelector('.header-badge');
    expect(badge?.textContent).toContain('SaaS-O-Matic AI Core v2.0');

    const badgeImg = el.querySelector<HTMLImageElement>('.assistant-badge-img');
    expect(badgeImg).toBeTruthy();
    expect(badgeImg?.getAttribute('src')).toBe('images/ai-assistant-badge.svg');
    expect(badgeImg?.getAttribute('alt')).toContain('Emblema 3D del Asistente IA Robot');

    const title = el.querySelector('.header-title');
    expect(title?.textContent).toContain('Asistente Inteligente');
  });

  it('should render quick prompt buttons', () => {
    const el = fixture.nativeElement as HTMLElement;
    const promptCards = el.querySelectorAll('.quick-prompt-card');
    expect(promptCards.length).toBeGreaterThan(0);
  });

  it('should send query when clicking a quick prompt', async () => {
    const spy = vi.spyOn(assistantService, 'askQuickPrompt').mockResolvedValue(undefined);
    const firstPrompt = component.quickPrompts()[0];

    await component.onSelectPrompt(firstPrompt);
    expect(spy).toHaveBeenCalledWith(firstPrompt);
  });

  it('should send user message and update input text', async () => {
    const spy = vi.spyOn(assistantService, 'sendMessage').mockResolvedValue(undefined);
    component.inputText.set('¿Cómo se calculan los tramos?');

    await component.onSend();

    expect(spy).toHaveBeenCalledWith('¿Cómo se calculan los tramos?');
    expect(component.inputText()).toBe('');
  });

  it('should trigger send on Enter key without shift', () => {
    const spy = vi.spyOn(component, 'onSend');
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: false });
    const preventSpy = vi.spyOn(event, 'preventDefault');

    component.onKeyDown(event);

    expect(preventSpy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should not trigger send on Shift+Enter', () => {
    const spy = vi.spyOn(component, 'onSend');
    const event = new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true });

    component.onKeyDown(event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should reset conversation when resetChat is called', () => {
    const resetSpy = vi.spyOn(assistantService, 'resetConversation');
    const toastSpy = vi.spyOn(toastService, 'show');

    component.resetChat();

    expect(resetSpy).toHaveBeenCalled();
    expect(toastSpy).toHaveBeenCalledWith(
      expect.stringContaining('reiniciada'),
      'info'
    );
  });

  it('should copy content to clipboard and show toast', async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextSpy },
    });
    const toastSpy = vi.spyOn(toastService, 'show');

    await component.copyContent('Texto de prueba');

    expect(writeTextSpy).toHaveBeenCalledWith('Texto de prueba');
    expect(toastSpy).toHaveBeenCalledWith(
      expect.stringContaining('copiada'),
      'success'
    );
  });

  it('should handle clipboard rejection gracefully', async () => {
    const writeTextSpy = vi.fn().mockRejectedValue(new Error('Copy failed'));
    Object.assign(navigator, {
      clipboard: { writeText: writeTextSpy },
    });
    const toastSpy = vi.spyOn(toastService, 'show');

    await component.copyContent('Texto de prueba');

    expect(toastSpy).toHaveBeenCalledWith(
      expect.stringContaining('No se pudo copiar'),
      'error'
    );
  });

  it('should format content converting bold, inline code, and line breaks safely', () => {
    const raw = 'Mensaje con **negrita** y `codigo`\nNueva linea & <script>alert(1)</script>';
    const safeHtml = component.formatContent(raw);
    const htmlString = (safeHtml as any).changingThisBreaksApplicationSecurity || '';

    expect(htmlString).toContain('<strong>negrita</strong>');
    expect(htmlString).toContain('<code class="code-token">codigo</code>');
    expect(htmlString).toContain('<br>');
    expect(htmlString).not.toContain('<script>');
    expect(htmlString).toContain('&lt;script&gt;');
  });

  it('should compute the last assistant message for live accessibility output', () => {
    expect(component.lastAssistantMessage()).toContain('copiloto en SaaS-O-Matic');

    assistantService.messages.set([
      ...assistantService.messages(),
      {
        id: 'msg-test-assistant',
        sender: 'assistant',
        content: 'Respuesta de prueba sobre Tramo 1',
        timestamp: new Date(),
      },
    ]);
    expect(component.lastAssistantMessage()).toContain('Tramo 1');
  });

  it('should display typing indicator when isTyping is true', () => {
    assistantService.isTyping.set(true);
    fixture.detectChanges();

    const typingEl = fixture.nativeElement.querySelector('.typing-bubble');
    expect(typingEl).toBeTruthy();
  });

  it('should transform quoted suggested questions into clickable buttons with data-query in formatContent', () => {
    const raw = 'Pregunta *"¿Cómo se calculan los tramos?"* para más info';
    const safeHtml = component.formatContent(raw);
    const htmlString = (safeHtml as any).changingThisBreaksApplicationSecurity || '';

    expect(htmlString).toContain('chat-suggested-query-btn');
    expect(htmlString).toContain('data-query="¿Cómo se calculan los tramos?"');
    expect(htmlString).toContain('touch_app');
  });

  it('should fill input text when clicking a suggested query button via onContentClick', () => {
    const btn = document.createElement('button');
    btn.className = 'chat-suggested-query-btn';
    btn.setAttribute('data-query', '¿Cómo se calculan los tramos?');
    const childSpan = document.createElement('span');
    childSpan.className = 'suggest-text';
    btn.appendChild(childSpan);

    const event = {
      target: childSpan,
    } as unknown as MouseEvent;

    component.onContentClick(event);
    expect(component.inputText()).toBe('¿Cómo se calculan los tramos?');
  });

  it('should ignore onContentClick if target is not inside a suggested query button', () => {
    const div = document.createElement('div');
    const event = {
      target: div,
    } as unknown as MouseEvent;

    component.inputText.set('');
    component.onContentClick(event);
    expect(component.inputText()).toBe('');
  });

  it('should not populate input when assistant is typing', () => {
    assistantService.isTyping.set(true);
    const btn = document.createElement('button');
    btn.className = 'chat-suggested-query-btn';
    btn.setAttribute('data-query', '¿Cómo se calculan los tramos?');

    const event = {
      target: btn,
    } as unknown as MouseEvent;

    component.inputText.set('');
    component.onContentClick(event);
    expect(component.inputText()).toBe('');
  });
});
