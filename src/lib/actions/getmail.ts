'use server'
import { ThreadDTO, ThreadListResponse } from "@/features/threads/types";
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
export async function getGmailThreadIds(accessToken: string, maxResults: number = 10, nextPageToken?: string): Promise<ThreadListResponse> {
  const url = new URL(`${fastapi_base}/auth/mail/threads`);
  url.searchParams.set('maxResults', maxResults.toString());
  if (nextPageToken) {
    url.searchParams.set('pageToken', nextPageToken);
  }
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
export async function getGmailMessageByThreadId(accessToken: string, threadId: string): Promise<ThreadDTO> {
  const url = new URL(`${fastapi_base}/auth/mail/threads/${threadId}`);
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  } 
  try{
    const res = await fetcher<ThreadDTO, FastApiErrorResponse>(url.toString(), requestInit);
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}

// メッセージID単位で本文を取得（messages.get）
export async function getGmailMessageById(accessToken: string, messageId: string) {
  const url = new URL(`${fastapi_base}/auth/mail/messages/${messageId}`);
  const requestInit:RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

