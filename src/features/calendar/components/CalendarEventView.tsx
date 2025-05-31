import React from "react";
import { CalendarEvent } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CalendarEventViewProps = {
  event: CalendarEvent;
  footer?: React.ReactNode;
  isSelected?: boolean;
  onSelect?: (eventId: string) => void;
  onDeselect?: (eventId: string) => void;
  isReadOnly: boolean;
};

export const CalendarEventView = ({
  event,
  isSelected,
  onSelect,
  onDeselect,
  footer,
  isReadOnly,
}: CalendarEventViewProps) => {
  const startTime = formatDateTime(event.start);
  const endTime = formatDateTime(event.end);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">
          {!isReadOnly && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => {
                if (isSelected) {
                  onDeselect?.(event.id);
                } else {
                  onSelect?.(event.id);
                }
              }}
            />
          )}
          {event.summary || "（タイトルなし）"}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ステータス: {event.status}
        </p>
      </CardHeader>
      <CardContent className="text-sm text-gray-700">
        <p>
          {startTime} ～ {endTime}
        </p>
        <p className="text-xs text-muted-foreground">
          タイムゾーン: {event.start.timeZone}
        </p>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
