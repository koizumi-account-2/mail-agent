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
