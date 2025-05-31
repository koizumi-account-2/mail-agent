"use server";
import { CalendarEventCreater } from "@/features/calendar/components/CalendarEventCreater";
type Params = {
  skey: string;
  projectId?: string;
  threadId?: string;
};
export default async function CalendarCreatePage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { skey, projectId, threadId } = await searchParams;

  console.log("key", skey);
  return (
    <CalendarEventCreater
      skey={skey}
      mode="candidate"
      projectId={projectId ? Number(projectId) : undefined}
      threadId={threadId}
    />
  );
}
