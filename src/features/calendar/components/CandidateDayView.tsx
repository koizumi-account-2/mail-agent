"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CandidateDay, EventSlot } from "@/features/calendar/types";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FaRegCalendarAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DialogWrapper from "@/components/common/DialogWrapper";
import { EventSlotPicker } from "@/components/common/input/EventSlotPickerPicker";
// eventSlotsの中にeventSlotが含まれているかどうかを返す
const isIncludedInSelectedEventSlots = (
  eventSlots: EventSlot[],
  eventSlot: EventSlot
) => {
  const setA = new Set(eventSlots.map((c) => `${c.start}|${c.end}`));
  return setA.has(`${eventSlot.start}|${eventSlot.end}`);
};

export const CandidateDayView = ({
  candidateDay,
  selectEventSlot,
  contentHeight = "h-[160px]",
  eventSlots,
  isShowOnly = false,
}: {
  candidateDay: CandidateDay;
  selectEventSlot?: (
    date: string,
    eventSlot: EventSlot,
    isChecked: boolean
  ) => void;
  contentHeight?: string;
  eventSlots?: EventSlot[];
  isShowOnly?: boolean;
}) => {
  const displayDate = format(new Date(candidateDay.date), "M月d日（EEE）", {
    locale: ja,
  });

  return (
    <Card className="gap-2 py-3">
      <CardHeader>
        <CardTitle className="text-base font-bold text-center">
          {displayDate}
        </CardTitle>
      </CardHeader>
      <CardContent className={`text-sm text-gray-700 ${contentHeight}`}>
        <div className="h-full overflow-y-auto flex flex-col gap-1 ">
          {candidateDay.candidates.map((c, i) => {
            return (
              <CandidateDayRow
                key={i}
                candidateDay={candidateDay}
                eventSlots={eventSlots}
                selectEventSlot={selectEventSlot}
                eventSlot={c}
                isShowOnly={isShowOnly}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// 候補日の中の時間を表示するコンポーネント
const CandidateDayRow = ({
  candidateDay,
  eventSlots,
  selectEventSlot,
  eventSlot,
  isShowOnly,
}: {
  candidateDay: CandidateDay;
  eventSlot: EventSlot;
  isShowOnly: boolean;
  selectEventSlot?: (
    date: string,
    eventSlot: EventSlot,
    isChecked: boolean
  ) => void;
  eventSlots?: EventSlot[];
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const start = format(parseISO(eventSlot.start), "HH:mm");
  const end = format(parseISO(eventSlot.end), "HH:mm");
  const handleSelectEventSlot = (newDate: Date, newEventSlot: EventSlot) => {
    console.log("元々eventSlot", eventSlot);
    // 元々のeventSlotをfalseにする
    selectEventSlot?.(
      format(candidateDay.date, "yyyy-MM-dd"),
      eventSlot,
      false
    );
    // 新しいeventSlotをtrueにする
    selectEventSlot?.(format(newDate, "yyyy-MM-dd"), newEventSlot, true);
    setShowDialog(false);
  };
  return (
    <div className="flex items-center gap-2">
      {eventSlots && !isShowOnly && (
        <Checkbox
          checked={
            eventSlots
              ? isIncludedInSelectedEventSlots(eventSlots, eventSlot)
              : true
          }
          onCheckedChange={(v) => {
            selectEventSlot?.(candidateDay.date, eventSlot, !!v);
          }}
        />
      )}
      <div className="border px-3 py-1 rounded bg-gray-50 gap-1">
        {start} ～ {end}
      </div>
      {!eventSlots && !isShowOnly && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowDialog(true)}
          >
            <FaRegCalendarAlt />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              selectEventSlot?.(candidateDay.date, eventSlot, false)
            }
          >
            <FaTrash />
          </Button>
          {showDialog && (
            <DialogWrapper
              isOpen={showDialog}
              onOpenChange={setShowDialog}
              title="任意の日付を選択"
            >
              <EventSlotPicker
                date={new Date(candidateDay.date)}
                eventSlot={eventSlot}
                selectEventSlot={handleSelectEventSlot}
              />
            </DialogWrapper>
          )}
        </>
      )}
    </div>
  );
};
