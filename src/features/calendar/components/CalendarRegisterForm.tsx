"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCompanyInfo } from "@/lib/actions/company";
import { useState } from "react";
import { CompanyInfoFullResult } from "@/features/company/types";
import { CompanySurveyView } from "./CompanySurveyView";
import { getCandidateDays, getEventTrend } from "@/lib/actions/calendarApi";
import { EventTrend, CandidateDay } from "@/features/calendar/types";
import { InputWithLabel } from "@/components/common/input/InputWithLabel";
export const CalendarRegisterForm = ({
  name,
  address,
}: {
  name?: string;
  address?: string;
}) => {
  const [value, setValue] = useState(name || "損保ジャパン");
  const [addressValue, setAddressValue] = useState(address || "損保ジャパン");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [, setEventTrend] = useState<EventTrend | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoFullResult | null>(
    null
  );
  const [candidateDays, setCandidateDays] = useState<CandidateDay[] | null>(
    null
  );
  const clickHandler = async () => {
    setIsLoading(true); // ローディング開始

    const [companyInfoResult, eventTrendResult] = await Promise.all([
      getCompanyInfo(value, addressValue),
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
      <div className="space-y-4 flex-col">
        <InputWithLabel
          label="会社名"
          placeholder="入力してください"
          type="text"
          id="companyName"
          value={value}
          name="companyName"
          onChange={(e) => setValue(e.target.value)}
        />
        <InputWithLabel
          label="住所"
          placeholder="入力してください"
          type="text"
          value={addressValue}
          name="companyAddress"
          onChange={(e) => setAddressValue(e.target.value)}
          id="companyAddress"
        />
      </div>
      <Button type="button" onClick={() => clickHandler()} disabled={isLoading}>
        調査
      </Button>

      <CompanySurveyView
        companyInfoFullResult={companyInfo}
        isLoading={isLoading}
        isLoading2={isLoading2}
        candidateDays={candidateDays}
      />
    </>
  );
};
