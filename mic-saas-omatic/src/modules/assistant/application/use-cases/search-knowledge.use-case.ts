import { Inject, Injectable } from '@nestjs/common';
import {
  KNOWLEDGE_REPOSITORY_PORT,
  type KnowledgeRepositoryPort,
} from '../ports/out/knowledge-repository.port';
import type {
  KnowledgeSearchResult,
  SearchKnowledgeQuery,
  SearchKnowledgeUseCasePort,
} from '../ports/in/search-knowledge.use-case.port';
import type { KnowledgeTopic } from '../../domain/entities/knowledge-topic.entity';

@Injectable()
export class SearchKnowledgeUseCase implements SearchKnowledgeUseCasePort {
  constructor(
    @Inject(KNOWLEDGE_REPOSITORY_PORT)
    private readonly knowledgeRepo: KnowledgeRepositoryPort,
  ) {}

  async execute(params: SearchKnowledgeQuery): Promise<KnowledgeSearchResult> {
    const lang = params.language ?? 'es';
    const query = params.query?.trim() ?? '';

    if (!query) {
      return this.buildFallbackResult(lang);
    }

    const topics = await this.knowledgeRepo.findAll();
    let bestTopic: KnowledgeTopic | null = null;
    let highestScore = 0;

    for (const topic of topics) {
      const score = topic.calculateMatchScore(query, lang);
      if (score > highestScore) {
        highestScore = score;
        bestTopic = topic;
      }
    }

    if (!bestTopic || highestScore < 2) {
      return this.buildFallbackResult(lang);
    }

    return {
      topicId: bestTopic.id,
      title: bestTopic.getTitle(lang),
      content: bestTopic.getContent(lang),
      action: bestTopic.getAction(lang),
      sources: bestTopic.sources,
      matched: true,
      score: highestScore,
    };
  }

  private buildFallbackResult(lang: string): KnowledgeSearchResult {
    const fallbacks: Record<string, string> = {
      en: `I couldn't find a direct match for your question, but I can help you with:
• **Tiered Pricing:** Ask *"How do pricing tiers calculate?"*
• **Simulations:** Ask *"How do I simulate a subscription cost?"*
• **Fiscal Rules:** Ask *"How are Spanish CIF or DNI verified?"*
• **Invoices & Billing:** Ask *"How does PDF invoice download work?"*
• **Currencies:** Ask *"Which currencies are supported?"*

Feel free to pick any of the quick suggestions above!`,
      fr: `Je n'ai pas trouvé de correspondance exacte, mais je peux vous renseigner sur :
• **Tarification par paliers :** Demandez le calcul des paliers.
• **Simulations :** Demandez comment simuler un abonnement.
• **Validation fiscale :** Demandez comment valider un CIF ou DNI espagnol.
• **Factures :** Demandez le fonctionnement des factures PDF.
• **Devises :** Demandez les devises prises en charge.

N'hésitez pas à choisir l'une des suggestions ci-dessus !`,
      es: `No he encontrado una coincidencia exacta para esa consulta, pero puedo ayudarte con:
• **Tarificación por Tramos:** Pregunta *"¿Cómo se calculan los tramos?"*
• **Simulador de Suscripciones:** Pregunta *"¿Cómo simulo el coste de una suscripción?"*
• **Validación Fiscal:** Pregunta *"¿Cómo se valida un CIF o NIF de la AEAT?"*
• **Facturación y PDF:** Pregunta *"¿Cómo funciona la descarga de facturas en PDF?"*
• **Divisas y Tipos de Cambio:** Pregunta *"¿Qué divisas soportáis?"*

¡O selecciona cualquiera de las preguntas recomendadas arriba!`,
    };

    return {
      topicId: 'fallback',
      title: lang === 'en' ? 'Help & Suggestions' : lang === 'fr' ? 'Aide & Suggestions' : 'Ayuda y Sugerencias',
      content: fallbacks[lang] ?? fallbacks['es'],
      action: null,
      sources: [
        'ai-workspace/01-specs/functional-specs.md',
        'ai-workspace/02-architecture/architecture-guidelines.md',
      ],
      matched: false,
      score: 0,
    };
  }
}
