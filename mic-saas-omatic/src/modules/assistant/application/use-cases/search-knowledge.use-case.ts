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
    return {
      topicId: 'fallback',
      title: lang === 'en' ? 'Help & Suggestions' : lang === 'fr' ? 'Aide & Suggestions' : 'Ayuda y Sugerencias',
      content: '',
      action: null,
      sources: [],
      matched: false,
      score: 0,
    };
  }
}
