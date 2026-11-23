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

const STOP_WORDS = new Set([
  // Spanish
  'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una',
  'su', 'al', 'lo', 'como', 'mas', 'pero', 'sus', 'le', 'ya', 'o', 'fue', 'este', 'ha', 'si', 'porque', 'esta',
  'son', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'ser', 'tiene', 'tambien', 'me', 'hasta', 'hay', 'donde',
  'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante',
  'ellos', 'e', 'esto', 'mi', 'antes', 'algunos', 'unos', 'yo', 'otro', 'otras', 'otra', 'tanto', 'esa', 'estos',
  'mucho', 'quienes', 'nada', 'muchos', 'cual', 'sea', 'poco', 'ella', 'estar', 'haber', 'estas', 'estaba', 'estamos',
  'algunas', 'algo', 'nosotros', 'mis', 'tu', 'te', 'ti', 'sirve', 'puedes', 'resumir', 'resumen', 'explicar',
  'cuenta', 'cuentame', 'dime', 'pasa', 'estan', 'están',
  // English
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as',
  'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will',
  'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which',
  'go', 'when', 'make', 'can', 'like', 'time', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your',
  'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new',
  'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  // French
  'de', 'la', 'le', 'et', 'les', 'des', 'en', 'un', 'du', 'une', 'que', 'est', 'pour', 'qui', 'dans', 'par',
  'sur', 'au', 'ce', 'ne', 'qu', 'pas', 'plus', 'avec', 'son', 'ont', 'ses', 'ou', 'sa', 'mais', 'nous',
  'comme', 'il', 'ils', 'vous', 'leur', 'aux', 'bien', 'ces', 'fait', 'elle', 'sans', 'tout', 'faire',
]);

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
   * Evaluates semantic match score for a given normalized query and language.
   * Filters out grammatical stop words and requires precise phrase or prefix matching
   * without false substring collisions.
   */
  calculateMatchScore(query: string, lang = 'es'): number {
    const normalized = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:()[\]"']/g, ' ')
      .trim();

    if (!normalized) {
      return 0;
    }

    const rawTokens = normalized.split(/\s+/).filter((t) => t.length > 2);
    const meaningfulTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));

    // 1. Prioritize active language keywords
    let activeScore = 0;
    const activeKeywords: readonly string[] = this._keywords[lang] ?? [];
    for (const kw of activeKeywords) {
      activeScore += this.scoreKeyword(kw, normalized, meaningfulTokens);
    }

    if (activeScore > 0) {
      return activeScore;
    }

    // 2. Fallback to other languages ONLY if active language yielded 0 matches
    let fallbackScore = 0;
    const otherKeywords: readonly string[] = Object.entries(this._keywords)
      .filter(([l]) => l !== lang)
      .flatMap(([, kwList]) => kwList);

    for (const kw of otherKeywords) {
      fallbackScore += this.scoreKeyword(kw, normalized, meaningfulTokens);
    }

    return Math.floor(fallbackScore * 0.5);
  }

  private scoreKeyword(keyword: string, normalizedQuery: string, meaningfulTokens: readonly string[]): number {
    const kwNorm = keyword
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[¿?¡!.,;:()[\]"']/g, ' ')
      .trim();

    if (!kwNorm || STOP_WORDS.has(kwNorm)) {
      return 0;
    }

    // Exact phrase match in query
    if (normalizedQuery.includes(kwNorm)) {
      return kwNorm.includes(' ') ? 30 : 15;
    }

    // Meaningful token exact match
    if (meaningfulTokens.includes(kwNorm)) {
      return 10;
    }

    // Stem / prefix match: ONLY when BOTH keyword and token have length >= 4
    if (kwNorm.length >= 4) {
      for (const t of meaningfulTokens) {
        if (t.length >= 4 && (t.startsWith(kwNorm) || kwNorm.startsWith(t))) {
          return 5;
        }
      }
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
