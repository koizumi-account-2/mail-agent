import React from "react";
import { CalendarEvent } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
export const CalendarEventView = ({ event }: { event: CalendarEvent }) => {
  const startTime = formatDateTime(event.start);
  const endTime = formatDateTime(event.end);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">
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
    </Card>
  );
};
