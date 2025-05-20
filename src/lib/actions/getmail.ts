'use server'
import { MailThreadDTO, ThreadDTO, ThreadListResponse } from "@/features/threads/types";
import { ApiError, FastApiErrorResponse } from "@/utils/customErrors";
import { fetcher } from "@/utils/fetcher";
const fastapi_base = 'http://localhost:8000/api';

const errorHandler = (error:unknown):Error => {
  console.log("error handle", error);
  if(error instanceof ApiError){
    console.log("error.info", JSON.stringify(error));
    return new Error(error.status+error.info.error, { cause: error });
  }else {
    return new Error('不明なエラー', { cause: error });
  }
}

// スレッドID一覧を取得（messages.list）
export async function getGmailThreadIds(accessToken: string, email:string, maxResults: number = 10, nextPageToken?: string): Promise<ThreadListResponse> {
  const url = new URL(`${fastapi_base}/auth/mail/threads`);
  url.searchParams.set('maxResults', maxResults.toString());
  if (nextPageToken) {
    url.searchParams.set('pageToken', nextPageToken);
  }
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: email,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  } 
  try{
    const res = await fetcher<ThreadListResponse, FastApiErrorResponse>(url.toString(), requestInit);
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}

// 指定されたスレッドIDのメッセージ一覧を取得（threads.get）
// TODO ThreadDTOの型を変更する DBとmailで使ってる方が同じになっている
export async function getGmailMessageByThreadId(accessToken: string, email:string, threadId: string): Promise<MailThreadDTO> {
  const url = new URL(`${fastapi_base}/auth/mail/threads/${threadId}`);
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: email,
      'Content-Type': 'application/json',
    },
    next: {
      revalidate: 3 * 60,
    },
  };
  try {
    const res = await fetcher<MailThreadDTO, FastApiErrorResponse>(
      url.toString(),
      requestInit
    );
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}

// メッセージID単位で本文を取得（messages.get）
export async function getGmailMessageById(accessToken: string, email:string, messageId: string) {
  const url = new URL(`${fastapi_base}/auth/mail/messages/${messageId}`);
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      email: email,
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  } 
  try{
    const res = await fetcher<ThreadDTO, FastApiErrorResponse>(url.toString(), requestInit);
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}

