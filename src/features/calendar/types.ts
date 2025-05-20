// apiからのレスポンスの型

export type CalendarEventListResponse = {
  events: CalendarEvent[];
};

export type EventSlot = {
    start: string;
    end: string;
}

export type CandidateDay = {
    date: string;
    day_of_week: number;
    candidates: EventSlot[];
}

export type EventTime = {
    dateTime: string | null;
    date: string | null;
    timeZone: string | null;
}

export type CalendarEvent = {
    id: string;
    status: string;
    summary: string;
    start: EventTime;
    end: EventTime;
    recurrence: string | null;
}


export type BusySlot = {
  day: number;      // 曜日（例: 0〜6）
  start: string;    // 例: "09:00"
  end: string;      // 例: "11:00"
};

export type FrequentSlot = {
  start: string;    // 例: "13:00"
  end: string;      // 例: "14:30"
};

export type EventTrend = {
  busySlots: BusySlot[];
  frequentSlots: FrequentSlot[];
  titlePatterns: string[];
};

export type CandidateResult = {
  candidate_days: CandidateDay[];
  candidate_days_all: CandidateDay[];
};

export type TentativeEvent = {
  candidate_days: CandidateDay[];
  thread_id: string;
  travel_time_minutes: number;
  event_duration_minutes: number;
  event_name: string;
}