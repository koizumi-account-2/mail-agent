'use server'
import { CandidateDay } from "@/features/calendar/types";
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
export async function createMail(candidateDays: CandidateDay[]): Promise<string> {

  const url = new URL(`${fastapi_base}/agent/mail/create/calendar`);

  const requestInit:RequestInit = {
    method: "POST",
    body: JSON.stringify({ "candidate_days": candidateDays }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  };
  try {
    const res = await fetcher<string, FastApiErrorResponse>(
      url.toString(),
      requestInit
    );
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}