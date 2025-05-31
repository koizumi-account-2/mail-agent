export type ThreadDTO = {
  id: string;
  subject?: string;
  locationName: string;
  locationAddress: string;
};

export type MailThreadDTO = {
  id: string;
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
  thread?: ThreadDTO;
  notes?: string;
  updatedAt?: Date;
};


export type MailDraft = {
  subject: string;
  body: string;
  to: string;
}

///fastapi

export type AnalyzeMailMessagesResponse = {
  summary: string;
  tasks: TaskKari[];
  latest_message_id: string;
  company_location: ContactPy;
};

//これは仮の型
export type TaskKari = {
  task_name: string;
  assigned_to: string;
};

export type ContactPy = {
  company_name: string;
  company_address: string;
};

export type MailDraftResponse = {
  id: string;
  message: {
    id: string;
    threadId: string;
    labelIds: string[];
  };
};
