'use server'
import { ThreadDTO, ThreadListResponse } from "@/features/threads/types";
const fastapi_base = 'http://localhost:8000/api';

// スレッドID一覧を取得（messages.list）
export async function getGmailThreadIds(accessToken: string, maxResults: number = 10, nextPageToken?: string): Promise<ThreadListResponse> {
  const url = new URL(`${fastapi_base}/auth/mail/threads`);
  url.searchParams.set('maxResults', maxResults.toString());
  if (nextPageToken) {
    url.searchParams.set('pageToken', nextPageToken);
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:ThreadListResponse = await res.json();
  return data;
}

// 指定されたスレッドIDのメッセージ一覧を取得（threads.get）
export async function getGmailMessageByThreadId(accessToken: string, threadId: string): Promise<ThreadDTO> {
  const url = new URL(`${fastapi_base}/auth/mail/threads/${threadId}`);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed to fetch thread ${threadId}: ${res.statusText}`);
  const data:ThreadDTO = await res.json();
  return data;
}

// メッセージID単位で本文を取得（messages.get）
export async function getGmailMessageById(accessToken: string, messageId: string) {
  const url = new URL(`${fastapi_base}/auth/mail/messages/${messageId}`);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'force-cache',
  });

  if (!res.ok) throw new Error(`Failed to fetch message ${messageId}: ${res.statusText}`);
  const data = await res.json();
  return data;
}



 // for(const message of sortedMessages){
  //   const mailBody = getMailBody(message.payload);
  //   console.log("--------------------------------");
  //   console.log("mailBody",mailBody);
  // }

