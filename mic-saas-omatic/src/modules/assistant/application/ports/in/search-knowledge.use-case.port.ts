export interface KnowledgeSearchResult {
  topicId: string;
  title: string;
  content: string;
  action: {
    label: string;
    route: string;
    icon: string;
  } | null;
  sources: string[];
  matched: boolean;
  score: number;
}

export interface SearchKnowledgeQuery {
  query: string;
  language?: string;
}

export interface SearchKnowledgeUseCasePort {
  execute(query: SearchKnowledgeQuery): Promise<KnowledgeSearchResult>;
}
