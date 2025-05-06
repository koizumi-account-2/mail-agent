'use server'
import { CalendarEventListResponse, CandidateDay } from "@/features/calendar/types";
import { auth } from "@/auth";
import { EventTrend } from "@/features/calendar/types";
const fastapi_base = 'http://localhost:8000/api/agent/calendar';


// スレッドID一覧を取得（messages.list）
export async function getEventList() {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const url = new URL(fastapi_base);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:CalendarEventListResponse = await res.json();
  return data;
}
// スレッドID一覧を取得（messages.list）
export async function getEventTrend() {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const url = new URL(`${fastapi_base}/past`);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data = await res.json();
  const eventTrend:EventTrend = {
    busySlots: data.busy_slots,
    frequentSlots: data.frequent_slots,
    titlePatterns: data.title_patterns,
  }
  return eventTrend;
}



export async function getCandidateDays(eventName: string,travelTimeSeconds: number,eventTrend: EventTrend) {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  console.log("eventTrend", eventTrend);
  const url = new URL(`${fastapi_base}/candidates`);
  const param = {
    insert_event: {
      duration: 6,
      summary: eventName,
      participants: ["me"],
    },
    trend: {
      busy_slots: eventTrend.busySlots,
      frequent_slots: eventTrend.frequentSlots,
      title_patterns: eventTrend.titlePatterns,
    },
    travel_time_seconds: travelTimeSeconds,
  }
  console.log("param", param);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(param),
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:CandidateDay[] = await res.json();
  return data;
}


 // for(const message of sortedMessages){
  //   const mailBody = getMailBody(message.payload);
  //   console.log("--------------------------------");
  //   console.log("mailBody",mailBody);
  // }

