import { auth } from "@/auth";
import {
  getGmailThreadIds,
  getGmailMessageByThreadId,
} from "@/lib/actions/getmail";
import { ThreadList } from "@/features/threads/components/ThreadList";
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
  const threadList = await getGmailThreadIds(session.accessToken);
  console.log("threadList", threadList);
  const threads: ThreadDTO[] = await Promise.all(
    threadList.threadIds.map((id) =>
      getGmailMessageByThreadId(session.accessToken, id)
    )
  );
  return (
    <div>
      <ThreadList threads={threads} projectId={projectId} />
    </div>
  );
}
