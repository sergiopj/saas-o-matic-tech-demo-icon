export interface KnowledgeAction {
  labels: Record<string, string>;
  route: string;
  icon: string;
}

export interface KnowledgeTopicProps {
  id: string;
  keywords: Record<string, string[]>;
  titles: Record<string, string>;
  content: Record<string, string>;
  actions?: KnowledgeAction[];
  sources?: string[];
}

export class KnowledgeTopic {
  private readonly _id: string;
  private readonly _keywords: Record<string, string[]>;
  private readonly _titles: Record<string, string>;
  private readonly _content: Record<string, string>;
  private readonly _actions: KnowledgeAction[];
  private readonly _sources: string[];

  private constructor(props: KnowledgeTopicProps) {
    this._id = props.id;
    this._keywords = props.keywords;
    this._titles = props.titles;
    this._content = props.content;
    this._actions = props.actions ?? [];
    this._sources = props.sources ?? [];
  }

  static create(props: KnowledgeTopicProps): KnowledgeTopic {
    KnowledgeTopic.validateId(props.id);
    KnowledgeTopic.validateContent(props.content);
    return new KnowledgeTopic(props);
  }

  get id(): string {
    return this._id;
  }

  get keywords(): Record<string, string[]> {
    return this._keywords;
  }

  get titles(): Record<string, string> {
    return this._titles;
  }

  get content(): Record<string, string> {
    return this._content;
  }

  get actions(): KnowledgeAction[] {
    return [...this._actions];
  }

  get sources(): string[] {
    return [...this._sources];
  }

  getTitle(lang: string): string {
    return this._titles[lang] ?? this._titles['es'] ?? this._id;
  }

  getContent(lang: string): string {
    return this._content[lang] ?? this._content['es'] ?? '';
  }

  getAction(lang: string): { label: string; route: string; icon: string } | null {
    if (this._actions.length === 0) {
      return null;
    }
    const action = this._actions[0];
    return {
      label: action.labels[lang] ?? action.labels['es'] ?? 'Ver más',
      route: action.route,
      icon: action.icon,
    };
  }

  /**
   * Evaluates the semantic match score for a given normalized query and language.
   * Prioritizes active language keywords with 1.5x multiplier and checks exact & token overlap.
   */
  calculateMatchScore(query: string, lang = 'es'): number {
    const normalized = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    if (!normalized) {
      return 0;
    }

    const queryTokens = normalized.split(/\s+/).filter((t) => t.length > 1);
    let score = 0;

    const activeKeywords: readonly string[] = this._keywords[lang] ?? [];
    for (const kw of activeKeywords) {
      score += this.scoreKeyword(kw, normalized, queryTokens) * 1.5;
    }

    const otherKeywords: readonly string[] = Object.entries(this._keywords)
      .filter(([l]) => l !== lang)
      .flatMap(([, kwList]) => kwList);

    for (const kw of otherKeywords) {
      score += this.scoreKeyword(kw, normalized, queryTokens);
    }

    return score;
  }

  private scoreKeyword(keyword: string, normalizedQuery: string, queryTokens: readonly string[]): number {
    const kwNorm = keyword
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    if (!kwNorm) {
      return 0;
    }

    // Exact phrase match in query
    if (normalizedQuery.includes(kwNorm)) {
      return kwNorm.includes(' ') ? 10 : 5;
    }

    // Token boundary match
    if (queryTokens.includes(kwNorm)) {
      return 4;
    }

    // Partial prefix match for keywords longer than 3 chars
    if (kwNorm.length > 3 && queryTokens.some((t) => t.includes(kwNorm) || kwNorm.includes(t))) {
      return 2;
    }

    return 0;
  }

  private static validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new Error('Knowledge topic ID cannot be empty');
    }
  }

  private static validateContent(content: Record<string, string>): void {
    if (!content || Object.keys(content).length === 0) {
      throw new Error('Knowledge topic must have content in at least one language');
    }
  }
}
