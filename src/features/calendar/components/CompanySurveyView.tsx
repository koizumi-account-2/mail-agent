"use client";

import { CompanyInfoFullResult } from "@/features/company/types";
import { CompanyInfo } from "@/features/company/components/companyInfo/CompanyInfo";
import { CompanyTravelTime } from "@/features/company/components/companyTravelTime/CompanyTravelTime";
import CompanyNewsView from "@/features/company/components/companyNews/CompanyNewsView";
import { AppTab } from "@/components/common/AppTab";
import { TabItem } from "@/components/common/AppTab";
import { SkeletonCard } from "@/components/common/skelton/SkeltonCard";
import { CandidateDay, EventSlot } from "@/features/calendar/types";
import { CandidateDayView } from "./CandidateDayView";
import { useState } from "react";
import { HeaderGroupS } from "@/components/common/header/HeaderGroups";
import { Button } from "@/components/ui/button";
import { EventSlotPicker } from "@/components/common/input/EventSlotPickerPicker";
import DialogWrapper from "@/components/common/DialogWrapper";
import { format } from "date-fns";
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
          {(isLoading2 || !selectedCandidateDays) && <SkeletonCard />}
          {!isLoading2 && selectedCandidateDays && (
            <div className="flex w-full">
              <div className="w-[300px] bg-gray-100 p-2 flex flex-col gap-1">
                <HeaderGroupS
                  headerTitle="候補日"
                  headerDescription="以下の日程が選択されています"
                />
                <ManualCandidate selectEventSlot={selectEventSlot} />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 h-[600px] overflow-y-auto">
                  {selectedCandidateDays
                    ?.sort((a, b) => a.date.localeCompare(b.date))
                    .map((day) => (
                      <CandidateDayView
                        key={day.date}
                        candidateDay={day}
                        contentHeight=""
                        selectEventSlot={selectEventSlot}
                      />
                    ))}
                </div>
              </div>
              <div className="flex-1 bg-gray-200 p-4">
                <HeaderGroupS
                  headerTitle="選択可能な日"
                  headerDescription="以下の日程が空いています"
                />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-min gap-4 h-[600px] overflow-y-auto">
                  {candidateDaysAll?.map((day) => (
                    <CandidateDayView
                      key={day.date}
                      candidateDay={day}
                      eventSlots={
                        selectedCandidateDays
                          .find((c) => c.date === day.date)
                          ?.candidates.map((c) => c) ?? []
                      }
                      selectEventSlot={selectEventSlot}
                    />
                  ))}
                </div>
              </div>
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

export const ManualCandidate = ({
  selectEventSlot,
  currentDate = new Date(),
}: {
  selectEventSlot: (
    date: string,
    eventSlot: EventSlot,
    isChecked: boolean
  ) => void;
  currentDate?: Date;
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const handleDeleteDialogChange = (open: boolean) => {
    setShowDialog(open);
  };

  const handleSelectEventSlot = (date: Date, eventSlot: EventSlot) => {
    selectEventSlot(format(date, "yyyy-MM-dd"), eventSlot, true);
    setShowDialog(false);
  };
  const defaultEventSlot = {
    start: "",
    end: "",
  };
  return (
    <>
      <div className="flex flex-col">
        <Button onClick={() => setShowDialog(true)}>任意の日付を選択</Button>
      </div>
      {showDialog && (
        <DialogWrapper
          isOpen={showDialog}
          onOpenChange={handleDeleteDialogChange}
          title="任意の日付を選択"
        >
          <EventSlotPicker
            date={currentDate}
            eventSlot={defaultEventSlot}
            selectEventSlot={handleSelectEventSlot}
          />
        </DialogWrapper>
      )}
    </>
  );
};
