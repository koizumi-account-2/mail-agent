'use server'
import { auth } from "@/auth";
import { CandidateDay } from "@/features/calendar/types";
import { MailDraft, MailDraftResponse } from "@/features/threads/types";
import { ApiError, FastApiErrorResponse } from "@/utils/customErrors";
import { fetcher } from "@/utils/fetcher";
import { prisma } from "../prisma";
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


export async function createMailBodyOfCandidateDays(candidateDays: CandidateDay[]): Promise<string> {


  const url = new URL(`${fastapi_base}/agent/mail/create/calendar`);

  const requestInit:RequestInit = {
    method: "POST",
    body: JSON.stringify({ "candidate_days": candidateDays }),
    headers: {
      "Content-Type": "application/json",

    },
    cache: "no-store",
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


export async function createMailDraft(mailDraft: MailDraft,projectId?: number): Promise<MailDraftResponse> {
  // {'id': 'r5731517984216379281', 'message': {'id': '1972144a194ddb61', 'threadId': '1972144a194ddb61', 'labelIds': ['DRAFT']}}
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const url = new URL(`${fastapi_base}/auth/mail/messages/draft`);
  console.log("mailDraft", mailDraft);
  const requestInit:RequestInit = {
    method: "POST",
    body: JSON.stringify(mailDraft),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.accessToken}`,
      "email": session.user.email,
    },
    cache: "no-store",
  };
  try {
    const res = await fetcher<MailDraftResponse, FastApiErrorResponse>(
      url.toString(),
      requestInit
    );
    if(projectId){
    // Threadを作成（手動でid指定）
    await prisma.thread.create({
      data: {
        id: res.message.threadId,
        subject: mailDraft.subject,
        projectId: projectId, // Projectに紐づけ
        locationName: "",
        locationAddress: "",
      },
    });
    }
    return res;
  }catch(error:unknown){
    throw errorHandler(error);
  }
}