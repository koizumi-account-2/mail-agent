// types/gmail.ts

export type GmailMessageHeader = {
  name: string;
  value: string;
};

export type GmailMessagePartBody = {
  data?: string;
  size?: number;
};

export type GmailMessagePart = {
  mimeType?: string;
  filename?: string;
  body?: GmailMessagePartBody;
  parts?: GmailMessagePart[];
  headers?: GmailMessageHeader[];
};

export type GmailMessage = {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet?: string;
  internalDate?: string;
  payload?: GmailMessagePart;
};

export type GmailThread = {
  id: string;
  snippet?: string;
  historyId?: string;
  messages?: GmailMessage[];
};

export type GmailThreadListResponse = {
  messages?: { id: string; threadId: string }[];
  nextPageToken?: string;
};

export type GmailSnipet = {
  id: string;
  content: string;
};