import { inject, Injectable, signal } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';
import {
  ChatAction,
  ChatMessage,
  KnowledgeTopic,
  QuickPrompt,
} from '../models/ai-assistant.model';
import { AI_KNOWLEDGE_TOPICS, QUICK_PROMPTS } from '../data/ai-knowledge.data';

@Injectable({
  providedIn: 'root',
})
export class AiAssistantService {
  private readonly i18n = inject(I18nService);

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
      content: this.getWelcomeContent(this.i18n.currentLanguage()),
      timestamp: new Date(),
    };
    this.messages.set([welcomeMessage]);
  }

  async sendMessage(query: string): Promise<void> {
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

    // Realistic typing latency simulation (650ms)
    await new Promise((resolve) => setTimeout(resolve, 650));

    const response = this.resolveAnswer(trimmed, this.i18n.currentLanguage());
    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-assistant`,
      sender: 'assistant',
      content: response.content,
      timestamp: new Date(),
      actions: response.actions,
      sources: response.sources,
    };

    this.messages.set([...this.messages(), assistantMessage]);
    this.isTyping.set(false);
  }

  async askQuickPrompt(prompt: QuickPrompt): Promise<void> {
    const localizedQuery = this.getLocalizedPromptQuery(prompt.id, this.i18n.currentLanguage());
    await this.sendMessage(localizedQuery);
  }

  resolveAnswer(
    query: string,
    lang: string
  ): {
    content: string;
    actions?: readonly ChatAction[];
    sources?: readonly string[];
  } {
    const normalized = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const queryTokens = normalized.split(/[^a-z0-9]+/);

    let bestTopic: KnowledgeTopic | null = null;
    let maxMatches = 0;

    for (const topic of AI_KNOWLEDGE_TOPICS) {
      // Prioritize active language keywords, followed by secondary languages
      const activeKeywords: readonly string[] = topic.keywords[lang] ?? [];
      const otherKeywords: readonly string[] = Object.entries(topic.keywords)
        .filter(([l]) => l !== lang)
        .flatMap(([, kwList]) => kwList);

      let matches = 0;

      // Primary language match (higher weight)
      for (const keyword of activeKeywords) {
        matches += this.scoreKeyword(keyword, normalized, queryTokens) * 1.5;
      }

      // Secondary languages fallback
      for (const keyword of otherKeywords) {
        matches += this.scoreKeyword(keyword, normalized, queryTokens);
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestTopic = topic;
      }
    }

    if (bestTopic && maxMatches > 0) {
      const content =
        bestTopic.content[lang] ||
        bestTopic.content['es'] ||
        bestTopic.content['en'];

      const actions: ChatAction[] | undefined = bestTopic.actions?.map((act) => ({
        label: act.labels[lang] || act.labels['es'] || act.labels['en'],
        route: act.route,
        icon: act.icon,
      }));

      return {
        content,
        actions,
        sources: bestTopic.sources,
      };
    }

    return {
      content: this.getFallbackContent(lang),
      sources: [
        'ai-workspace/01-specs/functional-specs.md',
        'ai-workspace/02-architecture/architecture-guidelines.md',
      ],
    };
  }

  private scoreKeyword(keyword: string, normalizedQuery: string, tokens: readonly string[]): number {
    const normalizedKw = keyword
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (normalizedKw.includes(' ')) {
      return normalizedQuery.includes(normalizedKw) ? 2 : 0;
    }
    if (normalizedKw.length <= 3) {
      return tokens.includes(normalizedKw) ? 1 : 0;
    }
    return normalizedQuery.includes(normalizedKw) ? 1 : 0;
  }

  private getWelcomeContent(lang: string): string {
    switch (lang) {
      case 'en':
        return `Hi there! 👋 I'm your SaaS-O-Matic copilot.

How can I help you today? Feel free to ask me about tiered pricing calculations, customer tax validation, subscription cost simulations, or issuing and downloading invoices.`;
      case 'de':
        return `Hallo! 👋 Ich bin dein SaaS-O-Matic Copilot.

Wie kann ich dir heute helfen? Frag mich gerne alles über Staffelpreisberechnungen, steuerliche Kundenprüfung, Abonnementsimulationen oder Rechnungs-PDFs.`;
      case 'fr':
        return `Bonjour ! 👋 Je suis votre copilote SaaS-O-Matic.

Comment puis-je vous aider aujourd'hui ? Posez-moi vos questions sur le calcul des tarifs par paliers, la validation fiscale des clients, les simulations ou les factures.`;
      default:
        return `¡Hola! 👋 Soy tu copiloto en SaaS-O-Matic.

¿En qué te puedo ayudar hoy? Puedo orientarte sobre cómo calcular precios por tramos, realizar simulaciones interactivas, validar clientes corporativos o emitir y descargar facturas.`;
    }
  }

  private getFallbackContent(lang: string): string {
    switch (lang) {
      case 'en':
        return `I couldn't find a direct match for your question, but I can help you with:
• **Tiered Pricing:** Ask *"How do pricing tiers calculate?"*
• **Simulations:** Ask *"How do I simulate a subscription cost?"*
• **Fiscal Rules:** Ask *"How are Spanish CIF or DNI verified?"*
• **Invoices & Billing:** Ask *"How does PDF invoice download work?"*
• **Currencies:** Ask *"Which currencies are supported?"*

Feel free to pick any of the quick suggestions above!`;
      case 'de':
        return `Ich habe keine direkte Übereinstimmung gefunden, helfe Ihnen aber gerne bei:
• **Staffelpreisen:** Fragen Sie nach der Staffelpreis-Berechnung.
• **Simulationen:** Fragen Sie nach der Abonnement-Simulation.
• **Steuerprüfung:** Fragen Sie nach der CIF- oder DNI-Validierung der AEAT.
• **Rechnungen:** Fragen Sie nach PDF-Download oder Rechnungsstornierung.
• **Währungen:** Fragen Sie nach den unterstützten Währungen.`;
      case 'fr':
        return `Je n'ai pas trouvé de correspondance exacte, mais je peux vous renseigner sur :
• **Tarification par paliers :** Demandez le calcul des paliers.
• **Simulations :** Demandez comment simuler un abonnement.
• **Validation fiscale :** Demandez comment valider un CIF ou DNI espagnol.
• **Factures :** Demandez le fonctionnement des factures PDF.
• **Devises :** Demandez les devises prises en charge.`;
      default:
        return `No he encontrado una coincidencia exacta para esa consulta, pero puedo ayudarte con:
• **Tarificación por Tramos:** Pregunta *"¿Cómo se calculan los tramos?"*
• **Simulador de Suscripciones:** Pregunta *"¿Cómo simulo el coste de una suscripción?"*
• **Validación Fiscal:** Pregunta *"¿Cómo se valida un CIF o NIF de la AEAT?"*
• **Facturación y PDF:** Pregunta *"¿Cómo funciona la descarga de facturas en PDF?"*
• **Divisas y Tipos de Cambio:** Pregunta *"¿Qué divisas soportáis?"*

¡O selecciona cualquiera de las preguntas rápidas recomendadas arriba!`;
    }
  }

  private getLocalizedPromptQuery(promptId: string, lang: string): string {
    const queries: Record<string, Record<string, string>> = {
      prompt_challenge: {
        es: '¿Cuáles son los objetivos y criterios del reto técnico?',
        en: 'What are the goals and criteria of the technical challenge?',
        de: 'Was sind die Ziele und Kriterien der technischen Challenge?',
        fr: 'Quels sont les objectifs et critères du défi technique ?',
      },
      prompt_pricing: {
        es: '¿Cómo funciona el cálculo de precios por tramos?',
        en: 'How does tiered pricing calculation work?',
        de: 'Wie funktioniert die Staffelpreis-Berechnung?',
        fr: 'Comment fonctionne le calcul des prix par paliers ?',
      },
      prompt_simulations: {
        es: '¿Cómo simulo el coste mensual y el desglose de tramos?',
        en: 'How do I simulate monthly costs and tier breakdown?',
        de: 'Wie simuliere ich monatliche Kosten und Staffelaufschlüsselung?',
        fr: 'Comment simuler les coûts mensuels et le détail des paliers ?',
      },
      prompt_fiscal: {
        es: '¿Cómo valida el sistema un CIF o NIF de la AEAT?',
        en: 'How does the system validate an AEAT CIF or NIF?',
        de: 'Wie validiert das System spanische CIF oder NIF der AEAT?',
        fr: "Comment le système valide-t-il un CIF ou NIF de l'AEAT ?",
      },
      prompt_invoices: {
        es: '¿Cómo se emite o anula una factura y cómo descargo el PDF?',
        en: 'How do I issue or cancel an invoice and download the PDF?',
        de: 'Wie erstelle oder storniere ich eine Rechnung und lade das PDF herunter?',
        fr: 'Comment émettre ou annuler une facture et télécharger le PDF ?',
      },
      prompt_currencies: {
        es: '¿Qué divisas están soportadas y qué pasa si no hay internet?',
        en: 'Which currencies are supported and what happens offline?',
        de: 'Welche Währungen werden unterstützt und was passiert offline?',
        fr: 'Quelles devises sont prises en charge et que se passe-t-il hors ligne ?',
      },
      prompt_architecture: {
        es: '¿Cómo está estructurada la arquitectura hexagonal del proyecto?',
        en: 'How is the hexagonal architecture structured?',
        de: 'Wie ist die hexagonale Architektur des Projekts strukturiert?',
        fr: 'Comment est structurée l’architecture hexagonale du projet ?',
      },
      prompt_customers: {
        es: '¿Cómo se registran los clientes corporativos y se redacta un correo?',
        en: 'How do I register corporate customers and compose emails?',
        de: 'Wie registriere ich Kunden und verfasse eine E-Mail?',
        fr: 'Comment enregistrer des clients et rédiger un e-mail ?',
      },
    };

    return queries[promptId]?.[lang] || queries[promptId]?.['es'] || promptId;
  }
}
