import { useState } from "react";
import { CandidateDay, CandidateResult, EventSlot } from "../types";
import { getEventTrend } from "@/lib/actions/calendarApi";
import { getCandidateDays } from "@/lib/actions/calendarApi";
import { differenceInCalendarDays } from "date-fns";
import { parseISO } from "date-fns";

export type CandidateDaysSearchParams = {
  eventName: string;
  travelTimeMinutes: number;
  durationMinutes: number;
  from: string;
  span: number;
  maxCandidatesPerDay: number;
};
type Status = "idle" | "loading" | "successGetTrend"  | "error";
const statusMessage: { [key in Status]: string } = {
  idle: "",
  loading: "検索中",
  successGetTrend: "トレンド取得完了 候補日を検索中",
  error: "エラーが発生",
};

export const useCandidateDaysSlot = (
  candidateDaysDefault: CandidateDay[],
  candidateDaysAllDefault: CandidateDay[]
) => {
  const [selectedCandidateDays, setSelectedCandidateDays] = useState<
    CandidateDay[]
  >(candidateDaysDefault);
  const [candidateDaysAll, setCandidateDaysAll] = useState<CandidateDay[]>(candidateDaysAllDefault);
  
  const [status, setStatus] = useState<Status>("idle");

  const initialize = ({  candidateDaysDefault,
    candidateDaysAllDefault,
  }: {
    candidateDaysDefault: CandidateDay[];
    candidateDaysAllDefault: CandidateDay[];
  }) => {
    setSelectedCandidateDays(candidateDaysDefault);
    setCandidateDaysAll(candidateDaysAllDefault);
  };

  const selectEventSlot = (
    date: string,
    eventSlot: EventSlot,
    isChecked: boolean
  ) => {
    console.log(date, eventSlot, isChecked);
    if (selectedCandidateDays.some((c) => c.date === date)) {
      setSelectedCandidateDays((prev) => {
        console.log("prev", prev);

        return prev.map((day) => {
          if (day.date !== date) return day;
          if (
            isChecked &&
            day.candidates.some(
              (c) => c.start === eventSlot.start && c.end === eventSlot.end
            )
          ) {
            return day;
          }
          const updatedCandidates = isChecked
            ? [...day.candidates, eventSlot] // 追加
            : day.candidates.filter(
                (c) => c.start !== eventSlot.start || c.end !== eventSlot.end // 内容一致比較
              );
          console.log("updatedCandidates", updatedCandidates);
          return {
            ...day,
            candidates: updatedCandidates,
          };
        });
      });
    } else {
      setSelectedCandidateDays((prev) => [
        ...prev,
        {
          date,
          day_of_week: new Date(date).getDay(),
          candidates: [eventSlot],
        },
      ]);
    }
  };

  const search = async (searchParams: CandidateDaysSearchParams): Promise<CandidateResult | null> => {
    let candidateDaysResult: CandidateResult | null = null;
    console.log("searchParams", searchParams);
    const targetDate = parseISO(searchParams.from);
    const offset = differenceInCalendarDays(targetDate,  new Date());
    console.log("offset", offset);

    setStatus("loading");
    const eventTrendResult = await getEventTrend();
    setStatus("successGetTrend");
    if (eventTrendResult) {

      candidateDaysResult = await getCandidateDays(
        {
          eventName: searchParams.eventName,
          travelTimeSeconds: searchParams.travelTimeMinutes * 60,
          eventDuration: searchParams.durationMinutes * 60,
          offset: offset,
          span: searchParams.span,
          maxCandidatesPerDay: searchParams.maxCandidatesPerDay,
          eventTrend: eventTrendResult,
        }
      );
      setSelectedCandidateDays(candidateDaysResult.candidate_days);
      setCandidateDaysAll(candidateDaysResult.candidate_days_all);
      setStatus("idle");
      return candidateDaysResult;
    }
    setStatus("idle");
    return null;
  };

  return { initialize,candidateDaysAll, selectedCandidateDays, selectEventSlot, search, statusMessage: statusMessage[status],  };
};
