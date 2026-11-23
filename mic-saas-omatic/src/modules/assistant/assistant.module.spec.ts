import { Test, TestingModule } from '@nestjs/testing';
import { AssistantModule } from './assistant.module';
import { SearchKnowledgeUseCase } from './application/use-cases/search-knowledge.use-case';
import { AssistantController } from './infrastructure/adapters/in/rest/assistant.controller';
import { KNOWLEDGE_REPOSITORY_PORT } from './application/ports/out/knowledge-repository.port';

describe('AssistantModule', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AssistantModule],
    })
      .overrideProvider(KNOWLEDGE_REPOSITORY_PORT)
      .useValue({
        findAll: jest.fn(),
        findById: jest.fn(),
        saveAll: jest.fn(),
        count: jest.fn(),
      })
      .overrideProvider('KnowledgeTopicTypeOrmEntityRepository')
      .useValue({})
      .compile();
  });

  it('should compile the module and resolve controllers and use cases', () => {
    const controller = moduleRef.get<AssistantController>(AssistantController);
    const useCase = moduleRef.get<SearchKnowledgeUseCase>(SearchKnowledgeUseCase);
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
  });
});
