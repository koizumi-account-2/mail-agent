import { CalendarEventListResponse } from "../types";
import { getEventByThreadId, getEventList } from "@/lib/actions/calendarApi";
import { CalendarEventViewListWrapper } from "./CalendarEventViewListWrapper";

export const CalendarEventContainer = async ({
  projectId,
  threadId,
  isReadOnly,
}: {
  projectId: number | null;
  threadId: string | null;
  isReadOnly: boolean;
}) => {
  console.log("CalendarEventContainer", projectId, threadId);
  const res: CalendarEventListResponse =
    threadId !== null && projectId !== null
      ? await getEventByThreadId(projectId, threadId)
      : await getEventList();

  return (
    <CalendarEventViewListWrapper
      events={res.events}
      threadId={threadId}
      projectId={projectId}
      isReadOnly={isReadOnly}
    />
  );
};
