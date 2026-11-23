import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeTopicTypeOrmEntity } from './knowledge-topic.typeorm-entity';
import { KnowledgePersistenceMapper } from './knowledge-persistence.mapper';
import type { KnowledgeRepositoryPort } from '../../../../application/ports/out/knowledge-repository.port';
import { KnowledgeTopic } from '../../../../domain/entities/knowledge-topic.entity';

@Injectable()
export class KnowledgePersistenceAdapter implements KnowledgeRepositoryPort {
  constructor(
    @InjectRepository(KnowledgeTopicTypeOrmEntity)
    private readonly repo: Repository<KnowledgeTopicTypeOrmEntity>,
  ) {}

  async findAll(): Promise<KnowledgeTopic[]> {
    const entities = await this.repo.find();
    return entities.map((e) => KnowledgePersistenceMapper.toDomain(e));
  }

  async findById(id: string): Promise<KnowledgeTopic | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity ? KnowledgePersistenceMapper.toDomain(entity) : null;
  }

  async saveAll(topics: KnowledgeTopic[]): Promise<void> {
    const entities = topics.map((t) => KnowledgePersistenceMapper.toTypeOrm(t));
    await this.repo.save(entities);
  }

  async count(): Promise<number> {
    return this.repo.count();
  }
}
