"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CandidateDay } from "@/features/calendar/types";
import { parseISO, format } from "date-fns";
import { ja } from "date-fns/locale";

export const CandidateDayView = ({
  candidateDay,
}: {
  candidateDay: CandidateDay;
}) => {
  const displayDate = format(
    new Date(candidateDay.date),
    "yyyy年M月d日（EEE）",
    {
      locale: ja,
    }
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-bold">{displayDate}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-700">
        {candidateDay.candidates.map((c, i) => {
          const start = format(parseISO(c.start), "HH:mm");
          const end = format(parseISO(c.end), "HH:mm");
          return (
            <div key={i} className="border px-3 py-1 rounded bg-gray-50">
              {start} ～ {end}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
