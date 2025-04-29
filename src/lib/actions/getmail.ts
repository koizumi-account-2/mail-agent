'use server'

import { GmailMessage, GmailMessagePart, GmailSnipet, GmailThread, GmailThreadListResponse } from "@/types/gmail";
import { getMailBody } from "@/utils/getMailBody";
import { ThreadDTO, MailMessageDTO } from "@/features/threads/types";
const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1';

// スレッドID一覧を取得（messages.list）
export async function getGmailThreadIds(accessToken: string): Promise<string[]> {
  const res = await fetch(`${GMAIL_API_BASE}/users/me/messages`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed to fetch message list: ${res.statusText}`);
  const data:GmailThreadListResponse = await res.json();
  const threadIds = data.messages?.map((msg) => msg.threadId) ?? [];
  console.log("threadIds",threadIds);
  return [...new Set(threadIds)];
}

// 指定されたスレッドIDのメッセージ一覧を取得（threads.get）
export async function getGmailMessageByThreadId(accessToken: string, threadId: string): Promise<ThreadDTO> {
  const res = await fetch(`${GMAIL_API_BASE}/users/me/threads/${threadId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed to fetch thread ${threadId}: ${res.statusText}`);
  const data:GmailThread = await res.json();
  //console.log("data",data);
  // internalDate順（昇順）に並べ替え
  const sortedMessages = (data.messages ?? []).sort((a, b) => {
    return  Number(b.internalDate) - Number(a.internalDate);
  });

  const messages: MailMessageDTO[] = sortedMessages.map((message) => ({
    id: message.id,
    snippet: message.snippet ?? "",
    subject: message.payload?.headers?.find((header) => header.name === "Subject")?.value ?? "",
    from: message.payload?.headers?.find((header) => header.name === "From")?.value ?? "",
    date: message.payload?.headers?.find((header) => header.name === "Date")?.value ?? "",
    content: getMailBody(message.payload),
  }));
  return {
    threadId: threadId,
    messages: messages,
  };
}

// メッセージID単位で本文を取得（messages.get）
export async function getGmailMessageById(accessToken: string, messageId: string) {
  const res = await fetch(`${GMAIL_API_BASE}/users/me/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed to fetch message ${messageId}: ${res.statusText}`);
  const data:GmailMessage = await res.json();
  return getMailBody(data.payload);
}



 // for(const message of sortedMessages){
  //   const mailBody = getMailBody(message.payload);
  //   console.log("--------------------------------");
  //   console.log("mailBody",mailBody);
  // }