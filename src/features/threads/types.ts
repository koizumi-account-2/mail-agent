export type ThreadDTO = {
  threadId: string;
  messages: MailMessageDTO[];
};

export type MailMessageDTO = {
  id: string;
  snippet: string;
  subject: string;
  sender: string;
  date: string;
  content: string;
};

export type ThreadListResponse = {
  threadIds: string[];
  nextPageToken?: string;
};

export type ThreadSituation = {
  id?: number;
  projectId: number;
  threadId: string;
  status: string;
  latestMessageId: string;
  notes?: string;
  updatedAt?: Date;
};

///fastapi

export type AnalyzeMailMessagesResponse = {
  summary: string;
  tasks: TaskKari[];
  latest_message_id: string;
};

//これは仮の型
export type TaskKari = {
  task_name: string;
  assigned_to: string;
};
