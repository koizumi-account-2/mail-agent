import { auth } from "@/auth";
import {
  getGmailThreadIds,
  getGmailMessageByThreadId,
} from "@/lib/actions/getmail";
import { ThreadList } from "@/features/threads/ThreadList";
import React from "react";
import { ThreadDTO } from "@/features/threads/types";
// projectIdを渡すと、そのプロジェクトに紐づける
type SearchParams = {
  projectId?: string;
};
export default async function ThreadsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const projectId = resolvedSearchParams.projectId;
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const threadIds = await getGmailThreadIds(session.accessToken);
  console.log("threadIds", threadIds);
  const firstFive = threadIds.slice(0, 5);
  const threads: ThreadDTO[] = await Promise.all(
    firstFive.map((id) => getGmailMessageByThreadId(session.accessToken, id))
  );
  return (
    <div>
      直近５けん
      <ThreadList threads={threads} projectId={projectId} />
    </div>
  );
}
