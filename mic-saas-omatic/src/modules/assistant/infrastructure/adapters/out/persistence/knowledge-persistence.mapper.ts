import { KnowledgeTopic, type KnowledgeAction } from '../../../../domain/entities/knowledge-topic.entity';
import { KnowledgeTopicTypeOrmEntity } from './knowledge-topic.typeorm-entity';

export class KnowledgePersistenceMapper {
  static toDomain(entity: KnowledgeTopicTypeOrmEntity): KnowledgeTopic {
    const keywords = JSON.parse(entity.keywordsJson || '{}') as Record<string, string[]>;
    const titles = JSON.parse(entity.titlesJson || '{}') as Record<string, string>;
    const content = JSON.parse(entity.contentJson || '{}') as Record<string, string>;
    const actions = entity.actionsJson
      ? (JSON.parse(entity.actionsJson) as KnowledgeAction[])
      : [];
    const sources = entity.sourcesJson
      ? (JSON.parse(entity.sourcesJson) as string[])
      : [];

    return KnowledgeTopic.create({
      id: entity.id,
      keywords,
      titles,
      content,
      actions,
      sources,
    });
  }

  static toTypeOrm(domain: KnowledgeTopic): KnowledgeTopicTypeOrmEntity {
    const entity = new KnowledgeTopicTypeOrmEntity();
    entity.id = domain.id;
    entity.keywordsJson = JSON.stringify(domain.keywords);
    entity.titlesJson = JSON.stringify(domain.titles);
    entity.contentJson = JSON.stringify(domain.content);
    entity.actionsJson = domain.actions.length > 0 ? JSON.stringify(domain.actions) : null;
    entity.sourcesJson = domain.sources.length > 0 ? JSON.stringify(domain.sources) : null;
    return entity;
  }
}
