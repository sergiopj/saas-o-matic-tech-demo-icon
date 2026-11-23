export interface AssistantActionDto {
  label: string;
  route: string;
  icon: string;
}

export interface AssistantReplyDto {
  topicId: string;
  title: string;
  content: string;
  action: AssistantActionDto | null;
  sources: string[];
  matched: boolean;
  score: number;
}
