import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeTopicTypeOrmEntity } from './infrastructure/adapters/out/persistence/knowledge-topic.typeorm-entity';
import { KnowledgePersistenceAdapter } from './infrastructure/adapters/out/persistence/knowledge-persistence.adapter';
import { KNOWLEDGE_REPOSITORY_PORT } from './application/ports/out/knowledge-repository.port';
import { SearchKnowledgeUseCase } from './application/use-cases/search-knowledge.use-case';
import { AssistantController } from './infrastructure/adapters/in/rest/assistant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KnowledgeTopicTypeOrmEntity])],
  controllers: [AssistantController],
  providers: [
    SearchKnowledgeUseCase,
    {
      provide: KNOWLEDGE_REPOSITORY_PORT,
      useClass: KnowledgePersistenceAdapter,
    },
  ],
  exports: [KNOWLEDGE_REPOSITORY_PORT, SearchKnowledgeUseCase, TypeOrmModule],
})
export class AssistantModule {}
