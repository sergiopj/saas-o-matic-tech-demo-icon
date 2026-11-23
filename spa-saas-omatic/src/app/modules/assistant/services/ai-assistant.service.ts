import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../../core/services/i18n.service';
import { TranslationKey } from '../../../core/i18n/translations';
import {
  AskAssistantRequestDto,
  AssistantReplyDto,
  ChatMessage,
  QuickPrompt,
} from '../models/ai-assistant.model';
import { QUICK_PROMPTS } from '../data/ai-knowledge.data';

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);
  private readonly apiUrl = `${environment.apiBaseUrl}/assistant/chat`;

  readonly messages = signal<readonly ChatMessage[]>([]);
  readonly isTyping = signal<boolean>(false);
  readonly quickPrompts = signal<readonly QuickPrompt[]>(QUICK_PROMPTS);

  constructor() {
    this.resetConversation();
  }

  resetConversation(): void {
    const welcomeMessage: ChatMessage = {
      id: `msg-${Date.now()}-welcome`,
      sender: 'assistant',
      content: this.i18n.t('assistant.welcome' as TranslationKey),
      timestamp: new Date(),
    };
    this.messages.set([welcomeMessage]);
  }

  async sendMessage(query: string, delayMs = 600): Promise<void> {
    const trimmed = query.trim();
    if (!trimmed || this.isTyping()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    this.messages.set([...this.messages(), userMessage]);
    this.isTyping.set(true);

    try {
      const payload: AskAssistantRequestDto = {
        query: trimmed,
        language: this.i18n.currentLanguage(),
      };

      const delayPromise = delayMs > 0
        ? new Promise((resolve) => setTimeout(resolve, delayMs))
        : Promise.resolve();

      const [reply] = await Promise.all([
        firstValueFrom(this.http.post<AssistantReplyDto>(this.apiUrl, payload)),
        delayPromise,
      ]);

      const resolvedContent = (!reply.matched || !reply.content?.trim())
        ? (reply.content?.trim() || this.i18n.t('assistant.fallback' as TranslationKey))
        : reply.content;

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        content: resolvedContent,
        timestamp: new Date(),
        actions: reply.action ? [reply.action] : undefined,
        sources: reply.sources && reply.sources.length > 0 ? reply.sources : undefined,
      };

      this.messages.set([...this.messages(), assistantMessage]);
    } catch {
      // Graceful offline fallback
      const fallbackMessage: ChatMessage = {
        id: `msg-${Date.now()}-assistant`,
        sender: 'assistant',
        content: this.i18n.t('assistant.fallback' as TranslationKey),
        timestamp: new Date(),
        sources: [
          'ai-workspace/01-specs/functional-specs.md',
          'ai-workspace/02-architecture/architecture-guidelines.md',
        ],
      };
      this.messages.set([...this.messages(), fallbackMessage]);
    } finally {
      this.isTyping.set(false);
    }
  }

  async askQuickPrompt(prompt: QuickPrompt, delayMs = 600): Promise<void> {
    const localizedQuery = this.i18n.t(prompt.labelKey as TranslationKey);
    await this.sendMessage(localizedQuery, delayMs);
  }
}
