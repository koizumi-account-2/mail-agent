import { auth } from "@/auth";
import {
  getGmailThreadIds,
  getGmailMessageByThreadId,
} from "@/lib/actions/getmail";
import { ThreadList } from "@/features/threads/components/ThreadList";
import React from "react";
import { MailThreadDTO } from "@/features/threads/types";
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
  const threadList = await getGmailThreadIds(
    session.accessToken,
    session.user.email
  );
  console.log("threadList", threadList);
  const threads: MailThreadDTO[] = await Promise.all(
    threadList.threadIds.map((id) =>
      getGmailMessageByThreadId(
        session.accessToken,
        session.user?.email ?? "",
        id
      )
    )
  );
  return (
    <div>
      <ThreadList threads={threads} projectId={projectId} />
    </div>
  );
}
