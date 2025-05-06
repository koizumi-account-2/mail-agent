"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCompanyInfo } from "@/lib/actions/company";
import { useState } from "react";
import { CompanyInfoFullResult } from "@/features/company/types";
import { CompanySurveyView } from "./CompanySurveyView";
import { getCandidateDays, getEventTrend } from "@/lib/actions/calendarApi";
import { EventTrend, CandidateDay } from "@/features/calendar/types";
export const CalendarRegisterForm = () => {
  const [value, setValue] = useState("損保ジャパン");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [eventTrend, setEventTrend] = useState<EventTrend | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoFullResult | null>(
    null
  );
  const [candidateDays, setCandidateDays] = useState<CandidateDay[] | null>(
    null
  );
  const clickHandler = async () => {
    setIsLoading(true); // ローディング開始

    const [companyInfoResult, eventTrendResult] = await Promise.all([
      getCompanyInfo(value),
      getEventTrend(),
    ]);
    setIsLoading(false);
    setIsLoading2(true);

    setCompanyInfo(companyInfoResult);
    setEventTrend(eventTrendResult);

    console.log("companyInfo", companyInfoResult);
    if (companyInfoResult) {
      console.log("eventTrend handle", eventTrendResult);
      const candidateDaysResult = await getCandidateDays(
        `[訪問]:${companyInfoResult.company_info.company_name}`,
        companyInfoResult.travel_time.duration_seconds,
        eventTrendResult
      );
      setCandidateDays(candidateDaysResult);
      console.log("candidateDays", candidateDaysResult);
    }
    setIsLoading2(false);
  };

  return (
    <>
      <div className="space-y-4 max-w-md flex">
        <Input
          type="text"
          id="companyName"
          placeholder="入力してください"
          value={value}
          name="companyName"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="button" onClick={clickHandler} disabled={isLoading}>
          調査
        </Button>
      </div>

      <CompanySurveyView
        companyInfoFullResult={companyInfo}
        isLoading={isLoading}
        isLoading2={isLoading2}
        candidateDays={candidateDays}
      />
    </>
  );
};
