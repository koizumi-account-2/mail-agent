"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCompanyInfo } from "@/lib/actions/company";
import { useEffect, useState } from "react";
import { CompanyInfoFullResult } from "@/features/company/types";
import { CompanySurveyView } from "./CompanySurveyView";
import { getCandidateDays, getEventTrend } from "@/lib/actions/calendarApi";
import { EventTrend, CandidateDay } from "@/features/calendar/types";
import { InputWithLabel } from "@/components/common/input/InputWithLabel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { localStorageUtil } from "@/utils/localStorage";
import { localStorageCandidateDays } from "@/types/common";

export const CalendarRegisterForm = ({
  threadId,
  projectId,
  name,
  address,
  skey,
}: {
  threadId?: string;
  name?: string;
  address?: string;
  projectId?: string;
  skey?: string;
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
    test.candidate_days
  );
  const [candidateDaysAll, setCandidateDaysAll] = useState<
    CandidateDay[] | null
  >(test.candidate_days_all);
  useEffect(() => {
    if (skey) {
      const { getValue } = localStorageUtil<localStorageCandidateDays>(true);
      const candidateDaysLocalStorage = getValue(skey);
      if (candidateDaysLocalStorage) {
        setCandidateDays(candidateDaysLocalStorage.candidateDays);
      }
    }
  }, [skey]);
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
      setCandidateDays(candidateDaysResult.candidate_days);
      setCandidateDaysAll(candidateDaysResult.candidate_days_all);
      console.log("candidateDays", candidateDaysResult);
    }
    setIsLoading2(false);
  };

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            検索条件
          </AccordionTrigger>
          <AccordionContent>
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
              <Button
                type="button"
                onClick={() => clickHandler()}
                disabled={isLoading}
              >
                調査
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <CompanySurveyView
        companyInfoFullResult={companyInfo}
        isLoading={isLoading}
        isLoading2={isLoading2}
        candidateDays={candidateDays}
        candidateDaysAll={candidateDaysAll}
        threadId={threadId}
        projectId={projectId}
        skey={skey}
      />
    </>
  );
};
const test = {
  candidate_days: [
    {
      date: "2025-05-12",
      day_of_week: 0,
      candidates: [
        {
          start: "2025-05-12T10:00:00+09:00",
          end: "2025-05-12T13:00:00+09:00",
        },
        {
          start: "2025-05-12T09:00:00+09:00",
          end: "2025-05-12T12:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-13",
      day_of_week: 1,
      candidates: [
        {
          start: "2025-05-13T15:00:00+09:00",
          end: "2025-05-13T18:00:00+09:00",
        },
        {
          start: "2025-05-13T10:00:00+09:00",
          end: "2025-05-13T13:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-14",
      day_of_week: 2,
      candidates: [
        {
          start: "2025-05-14T15:00:00+09:00",
          end: "2025-05-14T18:00:00+09:00",
        },
        {
          start: "2025-05-14T10:00:00+09:00",
          end: "2025-05-14T13:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-15",
      day_of_week: 3,
      candidates: [
        {
          start: "2025-05-15T15:00:00+09:00",
          end: "2025-05-15T18:00:00+09:00",
        },
        {
          start: "2025-05-15T10:00:00+09:00",
          end: "2025-05-15T13:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-16",
      day_of_week: 4,
      candidates: [
        {
          start: "2025-05-16T10:00:00+09:00",
          end: "2025-05-16T13:00:00+09:00",
        },
        {
          start: "2025-05-16T09:00:00+09:00",
          end: "2025-05-16T12:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-19",
      day_of_week: 0,
      candidates: [
        {
          start: "2025-05-19T10:00:00+09:00",
          end: "2025-05-19T13:00:00+09:00",
        },
        {
          start: "2025-05-19T09:00:00+09:00",
          end: "2025-05-19T12:00:00+09:00",
        },
      ],
    },
  ],
  candidate_days_all: [
    {
      date: "2025-05-12",
      day_of_week: 0,
      candidates: [
        {
          start: "2025-05-12T10:00:00+09:00",
          end: "2025-05-12T13:00:00+09:00",
        },
        {
          start: "2025-05-12T09:00:00+09:00",
          end: "2025-05-12T12:00:00+09:00",
        },
        {
          start: "2025-05-12T09:30:00+09:00",
          end: "2025-05-12T12:30:00+09:00",
        },
        {
          start: "2025-05-12T10:30:00+09:00",
          end: "2025-05-12T13:30:00+09:00",
        },
        {
          start: "2025-05-12T11:00:00+09:00",
          end: "2025-05-12T14:00:00+09:00",
        },
        {
          start: "2025-05-12T11:30:00+09:00",
          end: "2025-05-12T14:30:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-13",
      day_of_week: 1,
      candidates: [
        {
          start: "2025-05-13T15:00:00+09:00",
          end: "2025-05-13T18:00:00+09:00",
        },
        {
          start: "2025-05-13T10:00:00+09:00",
          end: "2025-05-13T13:00:00+09:00",
        },
        {
          start: "2025-05-13T09:00:00+09:00",
          end: "2025-05-13T12:00:00+09:00",
        },
        {
          start: "2025-05-13T09:30:00+09:00",
          end: "2025-05-13T12:30:00+09:00",
        },
        {
          start: "2025-05-13T10:30:00+09:00",
          end: "2025-05-13T13:30:00+09:00",
        },
        {
          start: "2025-05-13T11:00:00+09:00",
          end: "2025-05-13T14:00:00+09:00",
        },
        {
          start: "2025-05-13T11:30:00+09:00",
          end: "2025-05-13T14:30:00+09:00",
        },
        {
          start: "2025-05-13T14:00:00+09:00",
          end: "2025-05-13T17:00:00+09:00",
        },
        {
          start: "2025-05-13T14:30:00+09:00",
          end: "2025-05-13T17:30:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-14",
      day_of_week: 2,
      candidates: [
        {
          start: "2025-05-14T15:00:00+09:00",
          end: "2025-05-14T18:00:00+09:00",
        },
        {
          start: "2025-05-14T10:00:00+09:00",
          end: "2025-05-14T13:00:00+09:00",
        },
        {
          start: "2025-05-14T09:00:00+09:00",
          end: "2025-05-14T12:00:00+09:00",
        },
        {
          start: "2025-05-14T09:30:00+09:00",
          end: "2025-05-14T12:30:00+09:00",
        },
        {
          start: "2025-05-14T14:00:00+09:00",
          end: "2025-05-14T17:00:00+09:00",
        },
        {
          start: "2025-05-14T14:30:00+09:00",
          end: "2025-05-14T17:30:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-15",
      day_of_week: 3,
      candidates: [
        {
          start: "2025-05-15T15:00:00+09:00",
          end: "2025-05-15T18:00:00+09:00",
        },
        {
          start: "2025-05-15T10:00:00+09:00",
          end: "2025-05-15T13:00:00+09:00",
        },
        {
          start: "2025-05-15T09:00:00+09:00",
          end: "2025-05-15T12:00:00+09:00",
        },
        {
          start: "2025-05-15T09:30:00+09:00",
          end: "2025-05-15T12:30:00+09:00",
        },
        {
          start: "2025-05-15T14:00:00+09:00",
          end: "2025-05-15T17:00:00+09:00",
        },
        {
          start: "2025-05-15T14:30:00+09:00",
          end: "2025-05-15T17:30:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-16",
      day_of_week: 4,
      candidates: [
        {
          start: "2025-05-16T10:00:00+09:00",
          end: "2025-05-16T13:00:00+09:00",
        },
        {
          start: "2025-05-16T09:00:00+09:00",
          end: "2025-05-16T12:00:00+09:00",
        },
        {
          start: "2025-05-16T09:30:00+09:00",
          end: "2025-05-16T12:30:00+09:00",
        },
        {
          start: "2025-05-16T10:30:00+09:00",
          end: "2025-05-16T13:30:00+09:00",
        },
        {
          start: "2025-05-16T11:00:00+09:00",
          end: "2025-05-16T14:00:00+09:00",
        },
      ],
    },
    {
      date: "2025-05-19",
      day_of_week: 0,
      candidates: [
        {
          start: "2025-05-19T10:00:00+09:00",
          end: "2025-05-19T13:00:00+09:00",
        },
        {
          start: "2025-05-19T09:00:00+09:00",
          end: "2025-05-19T12:00:00+09:00",
        },
        {
          start: "2025-05-19T09:30:00+09:00",
          end: "2025-05-19T12:30:00+09:00",
        },
        {
          start: "2025-05-19T10:30:00+09:00",
          end: "2025-05-19T13:30:00+09:00",
        },
        {
          start: "2025-05-19T11:00:00+09:00",
          end: "2025-05-19T14:00:00+09:00",
        },
        {
          start: "2025-05-19T11:30:00+09:00",
          end: "2025-05-19T14:30:00+09:00",
        },
      ],
    },
  ],
};
