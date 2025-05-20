import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import React from "react";
import { auth } from "@/auth";
import { ImportMailForm } from "./ImportMailForm";

// projectIdを渡すと、そのプロジェクトに紐づける
// 渡さなければ、プロジェクトも新規作成
type SearchParams = {
  id?: string;
  projectId?: string;
};
export default async function ProjectImportPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const threadId = resolvedSearchParams.id || "";
  const projectId = resolvedSearchParams.projectId || "";

  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  if (!threadId) {
    throw new Error("idが指定されていません");
  }
  const thread = await getGmailMessageByThreadId(
    session.accessToken,
    session.user.email,
    threadId
  );
  console.log(thread);
  return (
    <div>
      <h1>ProjectImportPage</h1>
      <pre>{JSON.stringify(thread, null, 2)}</pre>
      <ImportMailForm thread={thread} projectId={projectId} />
    </div>
  );
}
