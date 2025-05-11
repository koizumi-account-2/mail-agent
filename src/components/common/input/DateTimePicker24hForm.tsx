"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function DateTimePicker24hForm({
  dateValue,
  onChange,
  formatString = "MM/dd/yyyy HH:mm",
}: {
  dateValue: Date;
  onChange: (date: Date) => void;
  formatString?: string;
}) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      date.setHours(dateValue.getHours());
      date.setMinutes(dateValue.getMinutes());
      onChange(date);
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const newDate = new Date(dateValue);
    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }
    onChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full pl-3 text-left font-normal",
            !dateValue && "text-muted-foreground"
          )}
        >
          {dateValue ? (
            format(dateValue, formatString)
          ) : (
            <span>{formatString}</span>
          )}
          <FaRegCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 24 }, (_, i) => i)
                  .filter((hour) => hour >= 9 && hour <= 18)
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        dateValue && dateValue.getHours() === hour
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange("hour", hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 2 }, (_, i) => i * 30).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      dateValue && dateValue.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
