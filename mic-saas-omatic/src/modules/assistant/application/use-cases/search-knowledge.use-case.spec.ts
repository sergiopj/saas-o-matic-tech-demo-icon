import { Test, TestingModule } from '@nestjs/testing';
import { SearchKnowledgeUseCase } from './search-knowledge.use-case';
import {
  KNOWLEDGE_REPOSITORY_PORT,
  type KnowledgeRepositoryPort,
} from '../ports/out/knowledge-repository.port';
import { KnowledgeTopic } from '../../domain/entities/knowledge-topic.entity';

describe('SearchKnowledgeUseCase', () => {
  let useCase: SearchKnowledgeUseCase;
  let mockRepo: Partial<KnowledgeRepositoryPort>;

  const sampleTopic = KnowledgeTopic.create({
    id: 'pricing_tiers',
    keywords: {
      es: ['tramo', 'precio', 'calcular'],
      en: ['tier', 'pricing', 'calculate'],
      fr: ['palier', 'prix'],
    },
    titles: {
      es: 'Motor de Tarificación',
      en: 'Pricing Engine',
      fr: 'Moteur de Tarification',
    },
    content: {
      es: 'Tramos progresivos.',
      en: 'Progressive tiers.',
      fr: 'Paliers progressifs.',
    },
    actions: [
      {
        labels: { es: 'Ir al Simulador', en: 'Go to Simulator', fr: 'Aller au Simulateur' },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['Specs v2.0'],
  });

  beforeEach(async () => {
    mockRepo = {
      findAll: jest.fn().mockResolvedValue([sampleTopic]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchKnowledgeUseCase,
        {
          provide: KNOWLEDGE_REPOSITORY_PORT,
          useValue: mockRepo,
        },
      ],
    }).compile();

    useCase = module.get<SearchKnowledgeUseCase>(SearchKnowledgeUseCase);
  });

  it('should return matched topic when query matches keywords', async () => {
    const result = await useCase.execute({ query: '¿cómo calcular el precio por tramo?', language: 'es' });
    expect(result.matched).toBe(true);
    expect(result.topicId).toBe('pricing_tiers');
    expect(result.title).toBe('Motor de Tarificación');
    expect(result.action?.route).toBe('/simulations');
    expect(result.score).toBeGreaterThan(0);
  });

  it('should return fallback result when query does not match anything', async () => {
    const result = await useCase.execute({ query: 'receta de paella valenciana', language: 'es' });
    expect(result.matched).toBe(false);
    expect(result.topicId).toBe('fallback');
    expect(result.content).toBe('');
  });

  it('should return fallback result when query is empty', async () => {
    const result = await useCase.execute({ query: '', language: 'en' });
    expect(result.matched).toBe(false);
    expect(result.topicId).toBe('fallback');
    expect(result.title).toBe('Help & Suggestions');
  });
});
