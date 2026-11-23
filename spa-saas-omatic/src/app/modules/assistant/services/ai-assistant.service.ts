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
      sources: [
        'ai-workspace/01-specs/functional-specs.md',
        'ai-workspace/02-architecture/architecture-guidelines.md',
        'AGENTS.md',
      ],
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

    // Realistic typing latency simulation (250ms)
    await new Promise((resolve) => setTimeout(resolve, 250));

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
      const activeKeywords = topic.keywords[lang] ?? [];
      const otherKeywords = Object.entries(topic.keywords)
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
        return `Hello! I am **SaaS-O-Matic AI Assistant**, your technical and commercial copilot.

I am deeply indexed on the entire repository knowledge base, business rules, and technical specifications:
• **Tiered Pricing Engine:** Marginal cumulative tiers (€10, €8, €5), storage, and API calls.
• **Fiscal Verification:** Real AEAT algorithmic validation (DNI, NIE, CIF mod 23 & Luhn).
• **Invoices & Billing:** \`INV-YYYY-XXXX\`, states, accessible modal cancellation, and PDF streaming.
• **Architecture:** Hexagonal architecture, SQLite WAL mode, and RFC 7807 Problem Details.
• **Multi-Currency:** EUR base, USD, GBP, CHF with offline-resilient cache fallback.

How can I help you optimize your SaaS business today?`;
      case 'de':
        return `Hallo! Ich bin der **SaaS-O-Matic KI-Assistent**, Ihr technischer und kaufmännischer Kopilot.

Ich kenne alle Spezifikationen, Geschäftsregeln und Architekturrichtlinien der Plattform:
• **Staffelpreise:** Stufen 1–3 (10 €, 8 €, 5 €), Speicher und API-Aufrufe.
• **Steuerprüfung:** Offizielle AEAT-Algorithmen (DNI, NIE, CIF) und EU-USt-IDs.
• **Rechnungen:** \`INV-YYYY-XXXX\`, barrierefreie Stornierung und PDF-Export.
• **Architektur:** Hexagonale Architektur, SQLite WAL-Modus und RFC 7807.

Wie kann ich Ihnen heute behilflich sein?`;
      case 'fr':
        return `Bonjour ! Je suis **l'Assistant IA SaaS-O-Matic**, votre copilote technique et commercial.

Je suis entraîné sur l'ensemble des spécifications et règles métier de la plateforme :
• **Tarification par paliers :** Paliers cumulatifs marginaux (10 €, 8 €, 5 €), stockage et appels API.
• **Validation fiscale :** Algorithmes officiels de l'AEAT (DNI, NIE, CIF) et TVA internationale.
• **Factures & PDF :** Numérotation \`INV-YYYY-XXXX\`, annulation sécurisée et export PDFKit.
• **Architecture :** Architecture hexagonale, SQLite en mode WAL et RFC 7807.

Comment puis-je vous aider aujourd'hui ?`;
      default:
        return `¡Hola! Soy el **Asistente IA de SaaS-O-Matic**, tu copiloto técnico y comercial.

Estoy alimentado con toda la documentación de \`ai-workspace/\`, reglas de negocio y directrices de arquitectura:
• **Motor de Precios por Tramos:** Tramos acumulativos marginales (10 €, 8 €, 5 €), almacenamiento y llamadas API.
• **Validación Fiscal AEAT:** Algoritmos oficiales de DNI, NIE y CIF (módulo 23 y Luhn ponderado).
• **Facturas y PDF:** Numeración \`INV-YYYY-XXXX\`, anulación segura y generación binaria en PDFKit.
• **Arquitectura Hexagonal:** Dominio inmaculado, SQLite en modo WAL y RFC 7807 Problem Details.
• **Multi-Divisa:** EUR, USD, GBP, CHF con resiliencia offline ante fallos de conexión.

¿En qué puedo ayudarte hoy a optimizar tus suscripciones?`;
    }
  }

  private getFallbackContent(lang: string): string {
    switch (lang) {
      case 'en':
        return `I couldn't find a direct match for your question, but I can help you with:
• **Tiered Pricing:** Ask *"How do pricing tiers calculate?"*
• **Fiscal Rules:** Ask *"How are Spanish CIF or DNI verified?"*
• **Invoices & Billing:** Ask *"How does PDF invoice download work?"*
• **Currencies:** Ask *"Which currencies are supported?"*
• **Architecture:** Ask *"Explain the hexagonal architecture."*

Feel free to pick any of the quick suggestions above!`;
      case 'de':
        return `Ich habe keine direkte Übereinstimmung gefunden, helfe Ihnen aber gerne bei:
• **Staffelpreisen:** Fragen Sie nach der Staffelpreis-Berechnung.
• **Steuerprüfung:** Fragen Sie nach der CIF- oder DNI-Validierung der AEAT.
• **Rechnungen:** Fragen Sie nach PDF-Download oder Rechnungsstornierung.
• **Architektur:** Fragen Sie nach der hexagonalen Architektur.`;
      case 'fr':
        return `Je n'ai pas trouvé de correspondance exacte, mais je peux vous renseigner sur :
• **Tarification par paliers :** Demandez le calcul des paliers.
• **Validation fiscale :** Demandez comment valider un CIF ou DNI espagnol.
• **Factures :** Demandez le fonctionnement des factures PDF.
• **Architecture :** Demandez des explications sur l'architecture hexagonale.`;
      default:
        return `No he encontrado una coincidencia exacta para esa consulta, pero puedo ayudarte con:
• **Tarificación por Tramos:** Pregunta *"¿Cómo se calculan los tramos?"*
• **Validación Fiscal:** Pregunta *"¿Cómo se valida un CIF o NIF de la AEAT?"*
• **Facturación y PDF:** Pregunta *"¿Cómo funciona la descarga de facturas en PDF?"*
• **Divisas y Tipos de Cambio:** Pregunta *"¿Qué divisas soportáis?"*
• **Arquitectura Hexagonal:** Pregunta *"¿Cómo está estructurado el backend y frontend?"*

¡O selecciona cualquiera de las preguntas rápidas recomendadas arriba!`;
    }
  }

  private getLocalizedPromptQuery(promptId: string, lang: string): string {
    const queries: Record<string, Record<string, string>> = {
      prompt_pricing: {
        es: '¿Cómo funciona el cálculo de precios por tramos?',
        en: 'How does tiered pricing calculation work?',
        de: 'Wie funktioniert die Staffelpreis-Berechnung?',
        fr: 'Comment fonctionne le calcul des prix par paliers ?',
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
