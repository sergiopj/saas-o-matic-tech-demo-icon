import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AiAssistantService } from './ai-assistant.service';
import { QUICK_PROMPTS } from '../data/ai-knowledge.data';
import { I18nService } from '../../../core/services/i18n.service';
import { AssistantReplyDto } from '../models/ai-assistant.model';
import { environment } from '../../../../environments/environment';

describe('AiAssistantService', () => {
  let service: AiAssistantService;
  let httpTesting: HttpTestingController;
  let i18nService: I18nService;
  const apiUrl = `${environment.apiBaseUrl}/assistant/chat`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AiAssistantService,
        I18nService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    i18nService = TestBed.inject(I18nService);
    i18nService.setLanguage('es');
    service = TestBed.inject(AiAssistantService);
    service.resetConversation();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created and initialized with an initial welcome message', () => {
    expect(service).toBeTruthy();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].content).toContain('¡Hola! 👋 Soy tu copiloto en SaaS-O-Matic.');
    expect(service.isTyping()).toBe(false);
  });

  it('should have predefined quick prompts', () => {
    expect(service.quickPrompts().length).toBe(QUICK_PROMPTS.length);
    expect(service.quickPrompts()[0].id).toBe('prompt_pricing');
  });

  it('should welcome in French and English when language is set', () => {
    i18nService.setLanguage('fr');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Bonjour ! 👋');

    i18nService.setLanguage('en');
    service.resetConversation();
    expect(service.messages()[0].content).toContain('Hi there! 👋');
  });

  it('should send a message, dispatch HTTP POST to backend API, and update messages with reply', async () => {
    const mockReply: AssistantReplyDto = {
      topicId: 'pricing_tiers',
      title: 'Cálculo de Precios por Tramos',
      content: 'El coste se calcula de manera marginal y acumulativa...',
      action: {
        label: 'Abrir Simulador',
        route: '/simulations',
        icon: 'tune',
      },
      sources: ['ai-workspace/01-specs/functional-specs.md'],
      matched: true,
      score: 10,
    };

    const sendPromise = service.sendMessage('¿Cómo se calculan los tramos?', 0);
    expect(service.isTyping()).toBe(true);
    expect(service.messages().length).toBe(2);
    expect(service.messages()[1].sender).toBe('user');
    expect(service.messages()[1].content).toBe('¿Cómo se calculan los tramos?');

    const req = httpTesting.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      query: '¿Cómo se calculan los tramos?',
      language: 'es',
    });
    req.flush(mockReply);

    await sendPromise;

    expect(service.isTyping()).toBe(false);
    expect(service.messages().length).toBe(3);
    expect(service.messages()[2].sender).toBe('assistant');
    expect(service.messages()[2].content).toContain('marginal y acumulativa');
    expect(service.messages()[2].actions?.[0].route).toBe('/simulations');
    expect(service.messages()[2].sources?.length).toBe(1);
  });

  it('should gracefully fallback to localized message if HTTP call fails', async () => {
    const sendPromise = service.sendMessage('query con error', 0);

    const req = httpTesting.expectOne(apiUrl);
    req.error(new ProgressEvent('network error'));

    await sendPromise;

    expect(service.isTyping()).toBe(false);
    expect(service.messages().length).toBe(3);
    const lastMsg = service.messages()[2];
    expect(lastMsg.sender).toBe('assistant');
    expect(lastMsg.content).toContain('No he encontrado una coincidencia exacta');
    expect(lastMsg.sources?.length).toBe(2);
  });

  it('should ignore empty or whitespace message', async () => {
    const countBefore = service.messages().length;
    await service.sendMessage('   ', 0);
    expect(service.messages().length).toBe(countBefore);
  });

  it('should handle askQuickPrompt using localized prompt text and dispatch to API', async () => {
    const prompt = QUICK_PROMPTS.find((p) => p.id === 'prompt_pricing')!;
    const askPromise = service.askQuickPrompt(prompt, 0);

    const req = httpTesting.expectOne(apiUrl);
    expect(req.request.body.query).toBe('¿Cómo funciona el cálculo de precios por tramos?');
    req.flush({
      topicId: 'pricing_tiers',
      title: 'Pricing',
      content: 'Respuesta de tramos',
      action: null,
      sources: [],
      matched: true,
      score: 8,
    });

    await askPromise;

    const msgs = service.messages();
    expect(msgs.length).toBe(3);
    expect(msgs[1].content).toContain('tramos');
    expect(msgs[2].content).toBe('Respuesta de tramos');
  });

  it('should reset conversation to a single welcome message without sources clutter', () => {
    service.resetConversation();
    expect(service.messages().length).toBe(1);
    expect(service.messages()[0].sender).toBe('assistant');
    expect(service.messages()[0].sources).toBeUndefined();
  });
});
