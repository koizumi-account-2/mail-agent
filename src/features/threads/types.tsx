export type ThreadDTO = {
  threadId: string;
  messages: MailMessageDTO[];
};

export type MailMessageDTO = {
  id: string;
  snippet: string;
  subject: string;
  from: string;
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
};

///fastapi

export type AnalyzeMailMessagesResponse = {
  summary: string;
  tasks: TaskKari[];
};

//これは仮の型
export type TaskKari = {
  taskName: string;
  assignedTo: string;
};
