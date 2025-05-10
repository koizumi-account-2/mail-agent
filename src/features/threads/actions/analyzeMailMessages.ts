"use server"
import { auth } from "@/auth";
import { AnalyzeMailMessagesResponse, ThreadSituation } from "../types";

// currentThreadSituationがnullの場合は初回の分析
export async function analyzeMailMessages(
  currentThreadSituation:ThreadSituation | null):Promise<AnalyzeMailMessagesResponse>{
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  if (!currentThreadSituation) {
    currentThreadSituation = {
      projectId: 0,
      threadId: "",
      status: "",
      latestMessageId: "",
      notes: "",
    };
  }
  const paramCurrentThreadSituation={
    current_situation:currentThreadSituation.notes || "",
    latest_message_id:currentThreadSituation.latestMessageId || "",
    existing_tasks:[]
  }

  const requestBody={
    my_info: "memememememe",
    thread_id:currentThreadSituation.threadId,
    current_situation:paramCurrentThreadSituation 
  }
  const res = await fetch(`http://localhost:8000/api/auth/mail/analyze/${currentThreadSituation.threadId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.accessToken}`
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    throw new Error(`FastAPI Error: ${res.statusText}`);
  }

  const data: AnalyzeMailMessagesResponse = await res.json();
  console.log("data", data);
  return data;
}


// data {
//   tasks: [
//     { task_name: '当日参加予定のメンバーの名簿を送付する', assigned_to: 'A株式会社 営業部 A' },
//     { task_name: '事前資料を5月1日中に共有する', assigned_to: 'B株式会社 営業推進部 B' }
//   ],
//   summary: 'A株式会社のAがB株式会社のBに新規プロジェクトの提案を行い、5月2日15時からの打ち合わせが決定しました。Aは当日参加予定のメンバーの名簿を後日送付することになっており、Bは事前資料を5月1日中に共有することを約束しています。現在の状況は、打ち合わせの日程が確定しており、資料の準備が進行中です。'
// }