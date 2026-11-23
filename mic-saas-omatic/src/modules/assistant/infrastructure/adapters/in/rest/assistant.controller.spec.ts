import { Test, TestingModule } from '@nestjs/testing';
import { AssistantController } from './assistant.controller';
import { SearchKnowledgeUseCase } from '../../../../application/use-cases/search-knowledge.use-case';

describe('AssistantController', () => {
  let controller: AssistantController;
  let mockUseCase: Partial<SearchKnowledgeUseCase>;

  beforeEach(async () => {
    mockUseCase = {
      execute: jest.fn().mockResolvedValue({
        topicId: 'pricing_tiers',
        title: 'Tiered Pricing',
        content: 'Tier breakdown details',
        action: { label: 'Simulator', route: '/simulations', icon: 'calculate' },
        sources: ['Specs'],
        matched: true,
        score: 15,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistantController],
      providers: [
        {
          provide: SearchKnowledgeUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<AssistantController>(AssistantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should process chat query and return structured reply', async () => {
    const result = await controller.ask({ query: 'how does pricing work?', language: 'en' });
    expect(result.matched).toBe(true);
    expect(result.topicId).toBe('pricing_tiers');
    expect(result.title).toBe('Tiered Pricing');
    expect(mockUseCase.execute).toHaveBeenCalledWith({
      query: 'how does pricing work?',
      language: 'en',
    });
  });
});
