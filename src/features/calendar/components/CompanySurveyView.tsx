"use client";

import { useState } from "react";
import { CompanyInfoFullResult } from "@/features/company/types";
import { AppTab } from "@/components/common/AppTab";
import { TabItem } from "@/components/common/AppTab";
import { CandidateDay, EventSlot } from "@/features/calendar/types";
import { TabCandidate } from "./tabContent/TabCandidate";
import { ConpamyNews } from "./tabContent/ConpamyNews";
import { TabCompanyInfo } from "./tabContent/TabCompanyInfo";
export const CompanySurveyView = ({
  companyInfoFullResult,
  candidateDays,
  candidateDaysAll,
  isLoading,
  isLoading2,
  threadId,
  projectId,
}: {
  companyInfoFullResult: CompanyInfoFullResult | null;
  candidateDays: CandidateDay[] | null;
  candidateDaysAll: CandidateDay[] | null;
  isLoading: boolean;
  isLoading2: boolean;
  threadId?: string;
  projectId?: string;
}) => {
  const [selectedCandidateDays, setSelectedCandidateDays] = useState<
    CandidateDay[]
  >(candidateDays ?? []);

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
      content: (
        <TabCompanyInfo
          isLoading={isLoading}
          companyInfoFullResult={companyInfoFullResult}
        />
      ),
    },
    {
      title: "ニュース",
      value: "2",
      content: (
        <ConpamyNews
          isLoading={isLoading}
          companyInfoFullResult={companyInfoFullResult}
        />
      ),
    },
    {
      title: "候補日",
      value: "3",
      content: (
        <TabCandidate
          isLoading2={isLoading2}
          selectedCandidateDays={selectedCandidateDays}
          selectEventSlot={selectEventSlot}
          candidateDaysAll={candidateDaysAll ?? []}
          threadId={threadId}
          projectId={projectId}
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
