import React, { useState } from "react";
import { EventSlot } from "@/features/calendar/types";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
const formatEventSlot = (eventSlot: EventSlot): EventSlot => {
  if (eventSlot.start === "" && eventSlot.end === "") {
    return {
      start: "09:00",
      end: "10:00",
    };
  }
  return {
    start: format(parseISO(eventSlot.start), "HH:mm"),
    end: format(parseISO(eventSlot.end), "HH:mm"),
  };
};
const isAfter = (a: string, b: string): boolean => {
  console.log(a, b);
  const [aHour, aMinute] = a.split(":").map(Number);
  const [bHour, bMinute] = b.split(":").map(Number);

  const aTotalMinutes = aHour * 60 + aMinute;
  const bTotalMinutes = bHour * 60 + bMinute;

  return aTotalMinutes > bTotalMinutes;
};
export const EventSlotPicker = ({
  date,
  eventSlot,
  selectEventSlot,
}: {
  date: Date;
  eventSlot: EventSlot;
  selectEventSlot?: (date: Date, eventSlot: EventSlot) => void;
}) => {
  console.log(eventSlot);
  const [dateValue, setDateValue] = useState<Date>(date);
  console.log(eventSlot);
  const [startTime, setStartTime] = useState(formatEventSlot(eventSlot).start); // "HH:mm"
  const [endTime, setEndTime] = useState(formatEventSlot(eventSlot).end); // "HH:mm"
  const [errorMessage, setErrorMessage] = useState("");

  const formatDateTime = (baseDate: Date, time: string): string => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(baseDate);
    d.setHours(h, m, 0, 0);
    return toFixedJstISOString(d);
  };

  const handleSubmit = () => {
    if (!isAfter(endTime, startTime)) {
      setErrorMessage("終了時間は開始時間より後にしてください");
      return;
    }
    const updated: EventSlot = {
      ...eventSlot,
      start: formatDateTime(dateValue, startTime),
      end: formatDateTime(dateValue, endTime),
    };
    selectEventSlot?.(dateValue, updated);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row gap-6 items-start">
        {/* カレンダー */}
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={(d) => d && setDateValue(d)}
          className="rounded-md border shadow-sm"
        />

        {/* 時間セレクター */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <TimeSelector
            label="開始"
            value={startTime}
            onChange={setStartTime}
          />
          <TimeSelector label="終了" value={endTime} onChange={setEndTime} />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {/* 送信ボタン */}
      <div className="flex flex-col">
        <Button onClick={handleSubmit}>確定</Button>
      </div>
    </div>
  );
};

const TimeSelector = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string; // e.g. "10:30"
  onChange: (newTime: string) => void;
}) => {
  const [hour, minute] = value.split(":");

  const handleClick = (type: "hour" | "minute", v: string) => {
    const newTime = type === "hour" ? `${v}:${minute}` : `${hour}:${v}`;
    onChange(newTime);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <div className="flex flex-col sm:flex-row sm:h-[100px] divide-y sm:divide-y-0 sm:divide-x rounded-md border bg-white shadow-sm overflow-hidden">
        {/* 時間セレクター（Hour） */}
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {Array.from({ length: 24 }, (_, i) => i)
              .filter((h) => h >= 9 && h <= 18)
              .map((h) => {
                const hStr = h.toString().padStart(2, "0");
                return (
                  <Button
                    key={hStr}
                    size="icon"
                    variant={hour === hStr ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleClick("hour", hStr)}
                  >
                    {hStr}
                  </Button>
                );
              })}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        {/* 分セレクター（Minute） */}
        <ScrollArea className="w-64 sm:w-auto">
          <div className="flex sm:flex-col p-2">
            {["00", "30"].map((m) => (
              <Button
                key={m}
                size="icon"
                variant={minute === m ? "default" : "ghost"}
                className="sm:w-full shrink-0 aspect-square"
                onClick={() => handleClick("minute", m)}
              >
                {m}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>
      </div>
    </div>
  );
};

export const toFixedJstISOString = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const y = date.getFullYear();
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${y}-${m}-${d}T${h}:${mi}:${s}+09:00`;
};
