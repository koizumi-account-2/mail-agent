"use server"
import { AnalyzeMailMessagesResponse, MailMessageDTO, ThreadSituation } from "../types";

// currentThreadSituationがnullの場合は初回の分析
export async function analyzeMailMessages(mailMessages: MailMessageDTO[],
  currentThreadSituation:ThreadSituation | null):Promise<AnalyzeMailMessagesResponse>{
  const paramCurrentThreadSituation={
    current_situation:currentThreadSituation?.notes || "",
    latest_message_id:currentThreadSituation?.latestMessageId || "",
    existing_tasks:[]
  }
 
  const requestBody={
      my_info: "memememememe",
      email_messages: mailMessages.map((mailMessage)=>{
              return {
                  "sender": mailMessage.from,
                  "subject": mailMessage.subject,
                  "content": mailMessage.content,
                  "date": mailMessage.date,
                  "id": mailMessage.id
              }
          }),
      current_situation:paramCurrentThreadSituation
    }
    const res = await fetch('http://localhost:8000/api/mail/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
