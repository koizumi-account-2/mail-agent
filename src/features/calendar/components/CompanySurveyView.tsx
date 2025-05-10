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
export const CompanySurveyView = ({
  companyInfoFullResult,
  candidateDays,
  isLoading,
  isLoading2,
}: {
  companyInfoFullResult: CompanyInfoFullResult | null;
  candidateDays: CandidateDay[] | null;
  isLoading: boolean;
  isLoading2: boolean;
}) => {
  console.log(candidateDays?.[0]);
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidateDays.map((day) => (
                <CandidateDayView key={day.date} candidateDay={day} />
              ))}
            </div>
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
