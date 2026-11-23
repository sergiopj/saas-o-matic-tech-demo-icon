import { KnowledgeTopic } from './knowledge-topic.entity';

describe('KnowledgeTopic Entity', () => {
  const validProps = {
    id: 'test_topic',
    keywords: {
      es: ['precio', 'tarifa', 'tramo'],
      en: ['price', 'tier', 'rate'],
      fr: ['prix', 'palier'],
    },
    titles: {
      es: 'Tarifas de Prueba',
      en: 'Test Pricing',
      fr: 'Tarifs de Test',
    },
    content: {
      es: 'Contenido explicativo en español.',
      en: 'Explanatory content in English.',
      fr: 'Contenu explicatif en français.',
    },
    actions: [
      {
        labels: { es: 'Ver Simulador', en: 'View Simulator', fr: 'Voir Simulateur' },
        route: '/simulations',
        icon: 'calculate',
      },
    ],
    sources: ['Spec 1.0'],
  };

  it('should instantiate a valid KnowledgeTopic with getters', () => {
    const topic = KnowledgeTopic.create(validProps);
    expect(topic.id).toBe('test_topic');
    expect(topic.getTitle('es')).toBe('Tarifas de Prueba');
    expect(topic.getTitle('en')).toBe('Test Pricing');
    expect(topic.getContent('es')).toBe('Contenido explicativo en español.');
    expect(topic.getAction('es')).toEqual({
      label: 'Ver Simulador',
      route: '/simulations',
      icon: 'calculate',
    });
    expect(topic.sources).toEqual(['Spec 1.0']);
  });

  it('should throw error when id is empty', () => {
    expect(() => KnowledgeTopic.create({ ...validProps, id: '' })).toThrow(
      'Knowledge topic ID cannot be empty',
    );
  });

  it('should throw error when content is empty', () => {
    expect(() => KnowledgeTopic.create({ ...validProps, content: {} })).toThrow(
      'Knowledge topic must have content in at least one language',
    );
  });

  it('should calculate positive match score for matching query', () => {
    const topic = KnowledgeTopic.create(validProps);
    const score = topic.calculateMatchScore('¿cuál es el precio por tramo?', 'es');
    expect(score).toBeGreaterThan(0);
  });

  it('should return 0 score for unrelated query or empty query', () => {
    const topic = KnowledgeTopic.create(validProps);
    expect(topic.calculateMatchScore('', 'es')).toBe(0);
    expect(topic.calculateMatchScore('astronauta en marte', 'es')).toBe(0);
  });
});
