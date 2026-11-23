import { KnowledgePersistenceMapper } from './knowledge-persistence.mapper';
import { KnowledgeTopic } from '../../../../domain/entities/knowledge-topic.entity';
import { KnowledgeTopicTypeOrmEntity } from './knowledge-topic.typeorm-entity';

describe('KnowledgePersistenceMapper', () => {
  it('should map domain entity to TypeORM entity correctly', () => {
    const domain = KnowledgeTopic.create({
      id: 'test_id',
      keywords: { es: ['hola'] },
      titles: { es: 'Título' },
      content: { es: 'Contenido' },
      actions: [{ labels: { es: 'Ver' }, route: '/test', icon: 'info' }],
      sources: ['Source 1'],
    });

    const typeOrm = KnowledgePersistenceMapper.toTypeOrm(domain);
    expect(typeOrm.id).toBe('test_id');
    expect(JSON.parse(typeOrm.keywordsJson)).toEqual({ es: ['hola'] });
    expect(JSON.parse(typeOrm.titlesJson)).toEqual({ es: 'Título' });
    expect(JSON.parse(typeOrm.contentJson)).toEqual({ es: 'Contenido' });
    expect(JSON.parse(typeOrm.actionsJson!)).toHaveLength(1);
    expect(JSON.parse(typeOrm.sourcesJson!)).toEqual(['Source 1']);
  });

  it('should map TypeORM entity to domain entity correctly', () => {
    const entity = new KnowledgeTopicTypeOrmEntity();
    entity.id = 'typeorm_id';
    entity.keywordsJson = JSON.stringify({ es: ['clave'] });
    entity.titlesJson = JSON.stringify({ es: 'Título TypeORM' });
    entity.contentJson = JSON.stringify({ es: 'Contenido TypeORM' });
    entity.actionsJson = JSON.stringify([{ labels: { es: 'Clic' }, route: '/route', icon: 'link' }]);
    entity.sourcesJson = JSON.stringify(['Doc A']);

    const domain = KnowledgePersistenceMapper.toDomain(entity);
    expect(domain.id).toBe('typeorm_id');
    expect(domain.getTitle('es')).toBe('Título TypeORM');
    expect(domain.getContent('es')).toBe('Contenido TypeORM');
    expect(domain.getAction('es')?.route).toBe('/route');
    expect(domain.sources).toEqual(['Doc A']);
  });
});
