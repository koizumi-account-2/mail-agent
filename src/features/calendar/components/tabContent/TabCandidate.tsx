"use client";
import { HeaderGroupS } from "@/components/common/header/HeaderGroups";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/common/DialogWrapper";
import { EventSlotPicker } from "@/components/common/input/EventSlotPickerPicker";
import { CandidateDayView } from "../CandidateDayView";
import { CandidateDay, EventSlot } from "../../types";
import { format } from "date-fns";
import { confirm } from "@/utils/confirm";
import { useRouter } from "next/navigation";
import {
  candidateDaysSearchAtom,
  CandidateInfoAtom,
} from "@/atoms/candidateDaysSearch";
import { useSetAtom, useAtomValue } from "jotai";

export const TabCandidate = ({
  selectedCandidateDays,
  selectEventSlot,
  candidateDaysAll,
  skey,
}: {
  selectedCandidateDays: CandidateDay[];
  selectEventSlot: (
    date: string,
    eventSlot: EventSlot,
    isChecked: boolean
  ) => void;
  candidateDaysAll: CandidateDay[];
  skey: string;
}) => {
  const router = useRouter();
  const currentCandidateInfo = useAtomValue(candidateDaysSearchAtom).find(
    (item) => item.id === skey
  );
  const saveCandidateInfo = useSetAtom(candidateDaysSearchAtom);
  if (!currentCandidateInfo) {
    return <div>候補日が見つかりません</div>;
  }
  const handleSubmit = async () => {
    const confirmed = await confirm("この内容で決定しますか？");
    if (confirmed) {
      const newCandidateInfo: CandidateInfoAtom = {
        ...currentCandidateInfo,
        candidateDays: selectedCandidateDays,
        candidateDaysAll: candidateDaysAll,
      };
      // ここで、結果が保存される
      saveCandidateInfo(newCandidateInfo);
      router.push(`/calendar/create?skey=${skey}`);
    }
  };
  return (
    <>
      <div className="flex w-full">
        <div className="w-[300px] bg-gray-100 p-2 flex flex-col gap-1">
          <HeaderGroupS
            headerTitle="候補日"
            headerDescription="以下の日程が選択されています"
          />
          <ManualCandidate selectEventSlot={selectEventSlot} />
          <Button variant="destructive" onClick={handleSubmit}>
            この内容で決定
          </Button>
          <div className="flex flex-col gap-2 h-[600px] overflow-y-auto">
            {selectedCandidateDays
              .filter((c) => c.candidates.length > 0)
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
    </>
  );
};

// 手動で候補日を選択するためのコンポーネント
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
