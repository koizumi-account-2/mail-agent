"use client";
import { createMail } from "@/lib/actions/createMail";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CandidateDayView } from "@/features/calendar/components/CandidateDayView";
import { HeaderGroupS } from "@/components/common/header/HeaderGroups";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { candidateDaysSearchAtom } from "@/atoms/candidateDaysSearch";
import { useAtomValue } from "jotai";
import { createTentativeEvents } from "@/lib/actions/calendarApi";
import { TentativeEvent } from "../types";
import DialogWrapper from "@/components/common/DialogWrapper";
import { InputWithLabel } from "@/components/common/input/InputWithLabel";
type CalendarEventCreater = {
  skey: string;
  mode: "candidate" | "draft";
};

export const CalendarEventCreater = ({
  skey,
  mode = "candidate",
}: CalendarEventCreater) => {
  const router = useRouter();
  console.log("candidateDaysSearchAtom", useAtomValue(candidateDaysSearchAtom));
  // const candidateInfo = test.find((item) => item.id === skey);
  const candidateInfo = useAtomValue(candidateDaysSearchAtom).find(
    (item) => item.id === skey
  );
  if (!candidateInfo) {
    return <div>候補日情報がありません</div>;
  }
  const handleEditCandidateDays = () => {
    router.push(`/calendar/candidate?skey=${skey}`);
  };
  const registerTentativeEvent = async (eventName: string) => {
    const tentativeEvent: TentativeEvent = {
      candidate_days: candidateInfo.candidateDays,
      thread_id: skey,
      travel_time_minutes: 30,
      event_duration_minutes: candidateInfo.searchParams.durationMinutes,
      event_name: eventName,
    };
    const res = await createTentativeEvents(tentativeEvent);
    console.log("registerTentativeEvent", res);
  };

  return (
    <>
      <HeaderGroupS
        headerTitle="候補日"
        headerDescription="以下の候補日を元にメールを作成します"
      />

      <Button onClick={handleEditCandidateDays}>候補日を編集する</Button>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] auto-rows-min gap-4 overflow-y-auto">
        {candidateInfo?.candidateDays.map((day) => (
          <CandidateDayView
            key={day.date}
            candidateDay={day}
            isShowOnly={true}
            contentHeight="h-[100px]"
          />
        ))}
      </div>
      <CalendarEventRegisterDialog
        registerTentativeEvent={registerTentativeEvent}
      />
    </>
  );
};

//   <HeaderGroupS
//     headerTitle="追加要望"
//     headerDescription="追加要望を入力してください"
//   />
//   <div className="flex-1">
//     <TextareaAutosize
//       minRows={4}
//       className="w-full rounded-md border-2 border-gray-300 p-2"
//       placeholder="追加要望を入力してください"
//     />
//   </div>
//   <p>{mail}</p>
//     const handleCreateMail = async () => {
// if (candidateInfo?.candidateDays) {
//   const res = await createMail(candidateInfo.candidateDays);
//   console.log("createMail", res);
//   setMail(res);
// }
//   <Button onClick={handleCreateMail}>メールを作成する</Button>
// };

export const CalendarEventRegisterDialog = ({
  registerTentativeEvent,
}: {
  registerTentativeEvent: (eventName: string) => Promise<void>;
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [eventName, setEventName] = useState("");

  return (
    <div>
      <Button onClick={() => setShowDialog(true)}>候補日を確認</Button>
      {showDialog && (
        <DialogWrapper
          isOpen={showDialog}
          onOpenChange={setShowDialog}
          title="候補日を確認"
        >
          <InputWithLabel
            label="イベント名"
            placeholder="イベント名を入力してください"
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Button onClick={() => registerTentativeEvent(eventName)}>
            候補日を確認
          </Button>
        </DialogWrapper>
      )}
    </div>
  );
};

const test = [
  {
    id: "d6bf14a8-9447-45be-a184-0fb0bebcec6c",
    candidateDays: [
      {
        date: "2025-05-21",
        day_of_week: 2,
        candidates: [
          {
            start: "2025-05-21T15:00:00+09:00",
            end: "2025-05-21T16:00:00+09:00",
          },
        ],
      },
      {
        date: "2025-05-22",
        day_of_week: 3,
        candidates: [
          {
            start: "2025-05-22T15:00:00+09:00",
            end: "2025-05-22T16:00:00+09:00",
          },
        ],
      },
      {
        date: "2025-05-23",
        day_of_week: 4,
        candidates: [
          {
            start: "2025-05-23T15:00:00+09:00",
            end: "2025-05-23T16:00:00+09:00",
          },
        ],
      },
    ],
    candidateDaysAll: [
      {
        date: "2025-05-21",
        day_of_week: 2,
        candidates: [
          {
            start: "2025-05-21T15:00:00+09:00",
            end: "2025-05-21T16:00:00+09:00",
          },
          {
            start: "2025-05-21T16:00:00+09:00",
            end: "2025-05-21T17:00:00+09:00",
          },
          {
            start: "2025-05-21T09:00:00+09:00",
            end: "2025-05-21T10:00:00+09:00",
          },
          {
            start: "2025-05-21T09:30:00+09:00",
            end: "2025-05-21T10:30:00+09:00",
          },
          {
            start: "2025-05-21T10:00:00+09:00",
            end: "2025-05-21T11:00:00+09:00",
          },
          {
            start: "2025-05-21T10:30:00+09:00",
            end: "2025-05-21T11:30:00+09:00",
          },
          {
            start: "2025-05-21T11:00:00+09:00",
            end: "2025-05-21T12:00:00+09:00",
          },
          {
            start: "2025-05-21T11:30:00+09:00",
            end: "2025-05-21T12:30:00+09:00",
          },
          {
            start: "2025-05-21T14:00:00+09:00",
            end: "2025-05-21T15:00:00+09:00",
          },
          {
            start: "2025-05-21T14:30:00+09:00",
            end: "2025-05-21T15:30:00+09:00",
          },
          {
            start: "2025-05-21T15:30:00+09:00",
            end: "2025-05-21T16:30:00+09:00",
          },
          {
            start: "2025-05-21T16:30:00+09:00",
            end: "2025-05-21T17:30:00+09:00",
          },
          {
            start: "2025-05-21T17:00:00+09:00",
            end: "2025-05-21T18:00:00+09:00",
          },
        ],
      },
      {
        date: "2025-05-22",
        day_of_week: 3,
        candidates: [
          {
            start: "2025-05-22T15:00:00+09:00",
            end: "2025-05-22T16:00:00+09:00",
          },
          {
            start: "2025-05-22T16:00:00+09:00",
            end: "2025-05-22T17:00:00+09:00",
          },
          {
            start: "2025-05-22T09:00:00+09:00",
            end: "2025-05-22T10:00:00+09:00",
          },
          {
            start: "2025-05-22T09:30:00+09:00",
            end: "2025-05-22T10:30:00+09:00",
          },
          {
            start: "2025-05-22T10:00:00+09:00",
            end: "2025-05-22T11:00:00+09:00",
          },
          {
            start: "2025-05-22T10:30:00+09:00",
            end: "2025-05-22T11:30:00+09:00",
          },
          {
            start: "2025-05-22T11:00:00+09:00",
            end: "2025-05-22T12:00:00+09:00",
          },
          {
            start: "2025-05-22T11:30:00+09:00",
            end: "2025-05-22T12:30:00+09:00",
          },
          {
            start: "2025-05-22T14:00:00+09:00",
            end: "2025-05-22T15:00:00+09:00",
          },
          {
            start: "2025-05-22T14:30:00+09:00",
            end: "2025-05-22T15:30:00+09:00",
          },
          {
            start: "2025-05-22T15:30:00+09:00",
            end: "2025-05-22T16:30:00+09:00",
          },
          {
            start: "2025-05-22T16:30:00+09:00",
            end: "2025-05-22T17:30:00+09:00",
          },
          {
            start: "2025-05-22T17:00:00+09:00",
            end: "2025-05-22T18:00:00+09:00",
          },
        ],
      },
      {
        date: "2025-05-23",
        day_of_week: 4,
        candidates: [
          {
            start: "2025-05-23T15:00:00+09:00",
            end: "2025-05-23T16:00:00+09:00",
          },
          {
            start: "2025-05-23T16:00:00+09:00",
            end: "2025-05-23T17:00:00+09:00",
          },
          {
            start: "2025-05-23T09:00:00+09:00",
            end: "2025-05-23T10:00:00+09:00",
          },
          {
            start: "2025-05-23T09:30:00+09:00",
            end: "2025-05-23T10:30:00+09:00",
          },
          {
            start: "2025-05-23T10:00:00+09:00",
            end: "2025-05-23T11:00:00+09:00",
          },
          {
            start: "2025-05-23T10:30:00+09:00",
            end: "2025-05-23T11:30:00+09:00",
          },
          {
            start: "2025-05-23T11:00:00+09:00",
            end: "2025-05-23T12:00:00+09:00",
          },
          {
            start: "2025-05-23T11:30:00+09:00",
            end: "2025-05-23T12:30:00+09:00",
          },
          {
            start: "2025-05-23T15:30:00+09:00",
            end: "2025-05-23T16:30:00+09:00",
          },
          {
            start: "2025-05-23T16:30:00+09:00",
            end: "2025-05-23T17:30:00+09:00",
          },
          {
            start: "2025-05-23T17:00:00+09:00",
            end: "2025-05-23T18:00:00+09:00",
          },
        ],
      },
    ],
    searchParams: {
      travelTimeMinutes: 30,
      durationMinutes: 60,
      maxCandidatesPerDay: 1,
      span: 2,
      from: "2025-05-22",
      eventName: "test",
    },
  },
];
