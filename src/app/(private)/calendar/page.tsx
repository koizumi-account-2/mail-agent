import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarEventContainer } from "@/features/calendar/components/CalendarEventContainer";
export default async function CalendarPage() {
  return (
    <>
      <Link href="/calendar/candidate">
        <Button>新規作成</Button>
      </Link>
      <CalendarEventContainer
        projectId={null}
        threadId={null}
        isReadOnly={true}
      />
    </>
  );
}
