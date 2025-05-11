import { CalendarRegisterForm } from "@/features/calendar/components/CalendarRegisterForm";
import { getThreadSituation } from "@/features/threads/dao/situation";

type SearchParams = {
  threadId?: string;
  projectId?: string;
};
export default async function CalendarRegisterPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const threadId = resolvedSearchParams.threadId;
  const projectId = resolvedSearchParams.projectId;

  const thread =
    projectId !== undefined && threadId !== undefined
      ? await getThreadSituation(Number(projectId), threadId)
      : null;
  return (
    <CalendarRegisterForm
      name={thread?.thread?.locationName ?? ""}
      address={thread?.thread?.locationAddress ?? ""}
      threadId={threadId}
      projectId={projectId}
    />
  );
}
