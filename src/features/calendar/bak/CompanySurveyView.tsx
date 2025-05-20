"use client";

import { useEffect, useState } from "react";
import { CompanyInfoFullResult } from "@/features/company/types";
import { AppTab } from "@/components/common/AppTab";
import { TabItem } from "@/components/common/AppTab";
import { CandidateDay, EventSlot } from "@/features/calendar/types";
import { TabCandidate } from "../components/tabContent/TabCandidate";
import { ConpamyNews } from "./ConpamyNews";
import { TabCompanyInfo } from "./TabCompanyInfo";
export const CompanySurveyView = ({
  companyInfoFullResult,
  candidateDays,
  candidateDaysAll,
  isLoading,
  isLoading2,
  threadId,
  projectId,
  skey,
}: {
  companyInfoFullResult: CompanyInfoFullResult | null;
  candidateDays: CandidateDay[] | null;
  candidateDaysAll: CandidateDay[] | null;
  isLoading: boolean;
  isLoading2: boolean;
  threadId?: string;
  projectId?: string;
  skey?: string;
}) => {
  const [selectedCandidateDays, setSelectedCandidateDays] = useState<
    CandidateDay[]
  >(candidateDays ?? []);
  useEffect(() => {
    if (candidateDays) {
      setSelectedCandidateDays(candidateDays);
    }
  }, [candidateDays]);
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
  const tabItems: TabItem[] = [
    {
      title: "会社情報",
      value: "1",
      content: () => (
        <TabCompanyInfo
          isLoading={isLoading}
          companyInfoFullResult={companyInfoFullResult}
        />
      ),
    },

    {
      title: "候補日",
      value: "2",
      content: () => (
        <TabCandidate
          isLoading2={isLoading2}
          selectedCandidateDays={selectedCandidateDays}
          selectEventSlot={selectEventSlot}
          candidateDaysAll={candidateDaysAll ?? []}
          threadId={threadId}
          projectId={projectId}
          skey={skey}
        />
      ),
    },
    {
      title: "ニュース",
      value: "3",
      content: () => (
        <ConpamyNews
          isLoading={isLoading}
          companyInfoFullResult={companyInfoFullResult}
        />
      ),
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <AppTab defaultTab="1" items={tabItems} />
      </div>
    </>
  );
};
