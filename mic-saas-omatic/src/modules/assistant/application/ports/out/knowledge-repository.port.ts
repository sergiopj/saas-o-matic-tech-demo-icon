import type { KnowledgeTopic } from '../../../domain/entities/knowledge-topic.entity';

export const KNOWLEDGE_REPOSITORY_PORT = Symbol('KNOWLEDGE_REPOSITORY_PORT');

export interface KnowledgeRepositoryPort {
  findAll(): Promise<KnowledgeTopic[]>;
  findById(id: string): Promise<KnowledgeTopic | null>;
  saveAll(topics: KnowledgeTopic[]): Promise<void>;
  count(): Promise<number>;
}
