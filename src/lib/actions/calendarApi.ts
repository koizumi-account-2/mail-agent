'use server'
import { CalendarEventListResponse, CandidateDay, CandidateResult, EventTrend, TentativeEvent } from "@/features/calendar/types";
import { auth } from "@/auth";
import { cache } from "react";
const fastapi_base = 'http://localhost:8000/api/agent/calendar';


// スレッドID一覧を取得（messages.list）
export const getEventList = cache(async () => {
    const session = await auth();
    if (!session?.user?.email || !session?.accessToken) {
      throw new Error("不正なリクエストです");
    }
    const url = new URL(fastapi_base);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        email: session.user.email,
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
    const data:CalendarEventListResponse = await res.json();
    return data;
  }
)

export const getEventByThreadId = cache(async (projectId: number, threadId: string) => {
    const session = await auth();
    if (!session?.user?.email || !session?.accessToken) {
      throw new Error("不正なリクエストです");
    }
    const url = new URL(fastapi_base);
    url.searchParams.set("event_tag", `${projectId}:${threadId}`);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        email: session.user.email,
      },
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
    const data:CalendarEventListResponse = await res.json();
    return data;
  }
);
// スレッドID一覧を取得（messages.list）
export const getEventTrend = cache(async () => {
    const session = await auth();
    if (!session?.user?.email || !session?.accessToken) {
      throw new Error("不正なリクエストです");
    }
    const url = new URL(`${fastapi_base}/past`);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        email: session.user.email,
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
)

type CandidateDaysParams = {
  eventName: string;
  travelTimeSeconds: number;
  eventDuration: number;
  offset: number;
  span: number;
  maxCandidatesPerDay: number;
  eventTrend: EventTrend;
}


// 候補日を取得
// offset_days:int=2,duration_days:int=7
export async function getCandidateDays(params: CandidateDaysParams) {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const url = new URL(`${fastapi_base}/candidates`);
  url.searchParams.set("offset_days", params.offset.toString());
  url.searchParams.set("duration_days", params.span.toString());
  url.searchParams.set("max_candidates_per_day", params.maxCandidatesPerDay.toString());
  const param = {
    insert_event: {
      duration: params.eventDuration,
      summary: params.eventName,
      participants: ["me"],
    },
    trend: {
      busy_slots: params.eventTrend.busySlots,
      frequent_slots: params.eventTrend.frequentSlots,
      title_patterns: params.eventTrend.titlePatterns,
    },
    travel_time_seconds: params.travelTimeSeconds,
  }
  console.log("param", param,"url",url.toString());
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
      email: session.user.email,
    },
    body: JSON.stringify(param),
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:CandidateResult = await res.json();
  return data;
}


 // for(const message of sortedMessages){
  //   const mailBody = getMailBody(message.payload);
  //   console.log("--------------------------------");
  //   console.log("mailBody",mailBody);
  // }


// event_tag -> project_id:thread_id

export async function createTentativeEvents(tentativeEvent: TentativeEvent) {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }

  const param = {
    candidate_days: tentativeEvent.candidate_days,
    event_name: `${tentativeEvent.event_name} 移動時間(往復):${tentativeEvent.travel_time_minutes}分`,
    event_tag: `${tentativeEvent.project_id}:${tentativeEvent.thread_id}`,
  }
  // class CalendarEventDTO(BaseModel):
  //   id: Optional[str] = None
  //   status: str
  //   summary: str
  const url = new URL(`${fastapi_base}/tentative`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
      email: session.user.email,
    },
    body: JSON.stringify(param),
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data = await res.json();
  return data;
}


export async function submitTentativeEvents({eventId, projectId, threadId}: {eventId: string, projectId: number, threadId: string}) {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  console.log("submitTentativeEvents", eventId, threadId);
  // class CalendarEventDTO(BaseModel):
  //   id: Optional[str] = None
  //   status: str
  //   summary: str

  const param = {
    event_id: eventId,
    event_tag: `${projectId}:${threadId}`,
  }
  const url = new URL(`${fastapi_base}/tentative/submit`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
      email: session.user.email,
    },
    body: JSON.stringify(param),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data = await res.json();
  return data;
}

export async function deleteTentativeEvents({eventIds, projectId, threadId}: {eventIds: string[], projectId: number, threadId: string}) {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  console.log("deleteTentativeEvents", eventIds, threadId);
  // class CalendarEventDTO(BaseModel):
  //   id: Optional[str] = None
  //   status: str
  //   summary: str
  const url = new URL(`${fastapi_base}/tentative`);
  const param = {
    event_ids: eventIds,
    event_tag: `${projectId}:${threadId}`,
  }
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
      email: session.user.email,
    },
    body: JSON.stringify(param),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data = await res.json();
  return data;
}