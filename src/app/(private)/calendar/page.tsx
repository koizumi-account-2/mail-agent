import { Button } from "@/components/ui/button";
import { getEventList } from "@/lib/actions/calendarApi";
import { CalendarEventView } from "@/features/calendar/components/CalendarEventView";
import { CalendarEventListResponse } from "@/features/calendar/types";
import Link from "next/link";
export default async function CalendarPage() {
  const res: CalendarEventListResponse = await getEventList();

  return (
    <>
      <Link href="/calendar/register">
        <Button>新規作成</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {res.events.map((event) => (
          <CalendarEventView key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
