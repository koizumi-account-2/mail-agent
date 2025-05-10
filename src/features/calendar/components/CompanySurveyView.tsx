"use client";

import { CompanyInfoFullResult } from "@/features/company/types";
import { CompanyInfo } from "@/features/company/components/companyInfo/CompanyInfo";
import { CompanyTravelTime } from "@/features/company/components/companyTravelTime/CompanyTravelTime";
import CompanyNewsView from "@/features/company/components/companyNews/CompanyNewsView";
import { AppTab } from "@/components/common/AppTab";
import { TabItem } from "@/components/common/AppTab";
import { SkeletonCard } from "@/components/common/skelton/SkeltonCard";
import { CandidateDay } from "@/features/calendar/types";
import { CandidateDayView } from "./CandidateDayView";
import { DateTimePicker24hForm } from "@/components/common/input/DateTimePicker24hForm";
import { useState } from "react";
export const CompanySurveyView = ({
  companyInfoFullResult,
  candidateDays,
  candidateDaysAll,
  isLoading,
  isLoading2,
}: {
  companyInfoFullResult: CompanyInfoFullResult | null;
  candidateDays: CandidateDay[] | null;
  candidateDaysAll: CandidateDay[] | null;
  isLoading: boolean;
  isLoading2: boolean;
}) => {
  console.log(candidateDays?.[0]);
  const firstCandidateDay = candidateDays?.[0];
  const [selectedDateList, setSelectedDateList] = useState<Date[]>(
    firstCandidateDay?.candidates.map((c) => new Date(c.start)) || []
  );
  const updatedCandidateDays = (index: number, date: Date) => {
    if (!selectedDateList.includes(date)) {
      const newCandidateDays = [...selectedDateList];
      newCandidateDays[index] = date;
      setSelectedDateList(newCandidateDays);
    }
  };
  const tabItems: TabItem[] = [
    {
      title: "会社情報",
      value: "1",
      content: (
        <>
          {(isLoading || !companyInfoFullResult) && <SkeletonCard />}
          {!isLoading && companyInfoFullResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompanyInfo companyInfo={companyInfoFullResult.company_info} />
              <CompanyTravelTime travel={companyInfoFullResult.travel_time} />
            </div>
          )}
        </>
      ),
    },
    {
      title: "ニュース",
      value: "2",
      content: (
        <>
          {(isLoading || !companyInfoFullResult) && <SkeletonCard />}
          {!isLoading && companyInfoFullResult && (
            <div className="h-[500px]">
              <CompanyNewsView
                companyNews={companyInfoFullResult.company_news}
              />
            </div>
          )}
        </>
      ),
    },
    {
      title: "候補日",
      value: "3",
      content: (
        <>
          {(isLoading2 || !candidateDays) && <SkeletonCard />}
          {!isLoading2 && candidateDays && (
            <>
              <SelectedDateList
                selectedDateList={selectedDateList}
                updatedCandidateDays={updatedCandidateDays}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {candidateDaysAll?.map((day) => (
                  <CandidateDayView key={day.date} candidateDay={day} />
                ))}
              </div>
            </>
          )}
        </>
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

const SelectedDateList = ({
  selectedDateList,
  updatedCandidateDays,
}: {
  selectedDateList: Date[];
  updatedCandidateDays: (index: number, date: Date) => void;
}) => {
  return (
    <div>
      {selectedDateList.map((date, index) => (
        <DateTimePicker24hForm
          dateValue={date}
          onChange={(date) => {
            updatedCandidateDays(index, date);
          }}
          key={date.toUTCString()}
        />
      ))}
    </div>
  );
};
