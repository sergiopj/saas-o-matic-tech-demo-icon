export type MessageSender = 'user' | 'assistant';

export interface ChatAction {
  label: string;
  route: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: Date;
  actions?: readonly ChatAction[];
  sources?: readonly string[];
}

export interface QuickPrompt {
  id: string;
  labelKey: string;
  query: string;
  icon: string;
}

export interface KnowledgeTopic {
  id: string;
  keywords: readonly string[];
  titles: Readonly<Record<string, string>>;
  content: Readonly<Record<string, string>>;
  actions?: readonly {
    labels: Readonly<Record<string, string>>;
    route: string;
    icon: string;
  }[];
  sources: readonly string[];
}
