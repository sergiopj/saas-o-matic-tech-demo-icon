import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ToastService } from '../../../../core/services/toast.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { AiAssistantService } from '../../services/ai-assistant.service';
import { QuickPrompt } from '../../models/ai-assistant.model';

@Component({
  selector: 'app-assistant',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  templateUrl: './assistant.component.html',
  styleUrl: './assistant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantComponent implements AfterViewChecked {
  private readonly assistantService = inject(AiAssistantService);
  private readonly toast = inject(ToastService);
  private readonly i18n = inject(I18nService);
  private readonly sanitizer = inject(DomSanitizer);

  @ViewChild('scrollContainer')
  private readonly scrollContainer?: ElementRef<HTMLDivElement>;

  readonly inputText = signal<string>('');
  readonly messages = this.assistantService.messages;
  readonly isTyping = this.assistantService.isTyping;
  readonly quickPrompts = this.assistantService.quickPrompts;

  private shouldScrollToBottom = false;

  readonly lastAssistantMessage = computed(() => {
    const list = this.messages();
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].sender === 'assistant') {
        return list[i].content;
      }
    }
    return '';
  });

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  async onSend(): Promise<void> {
    const query = this.inputText().trim();
    if (!query || this.isTyping()) {
      return;
    }

    this.inputText.set('');
    this.shouldScrollToBottom = true;
    await this.assistantService.sendMessage(query);
    this.shouldScrollToBottom = true;
  }

  async onSelectPrompt(prompt: QuickPrompt): Promise<void> {
    if (this.isTyping()) {
      return;
    }
    this.shouldScrollToBottom = true;
    await this.assistantService.askQuickPrompt(prompt);
    this.shouldScrollToBottom = true;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void this.onSend();
    }
  }

  resetChat(): void {
    this.assistantService.resetConversation();
    this.toast.show(this.i18n.t('assistant.cleared'), 'info');
    this.shouldScrollToBottom = true;
  }

  async copyContent(text: string): Promise<void> {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        this.toast.show(this.i18n.t('assistant.copied'), 'success');
      } catch {
        this.toast.show(this.i18n.t('assistant.copyError'), 'error');
      }
    }
  }

  formatContent(content: string): SafeHtml {
    const escaped = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const formatted = escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="code-token">$1</code>')
      .replace(/\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }

  private scrollToBottom(): void {
    if (this.scrollContainer?.nativeElement) {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}
