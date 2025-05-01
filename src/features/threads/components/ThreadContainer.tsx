import React from "react";

import { auth } from "@/auth";
import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { ThreadAnalyzeView } from "./ThreadAnalyzeView";
import { getThreadSituation } from "../dao/situation";
import { ThreadSituation } from "../types";
export const ThreadContainer = async ({
  projectId,
  threadId,
}: {
  projectId: string;
  threadId: string;
}) => {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  // スレッドのメッセージを取得
  const thread = await getGmailMessageByThreadId(session.accessToken, threadId);
  const threadSituationObj = await getThreadSituation(
    Number(projectId),
    threadId
  );
  const threadSituation: ThreadSituation = {
    id: threadSituationObj?.id,
    projectId: Number(projectId),
    threadId: threadSituationObj?.threadId ?? "",
    status: threadSituationObj?.status ?? "",
    latestMessageId: threadSituationObj?.latestMessageId ?? "",
    notes: threadSituationObj?.notes ?? "",
  };
  console.log("threadSituation", threadSituation);
  return (
    <>
      projectId:{projectId}
      <ThreadAnalyzeView
        thread={thread}
        projectId={projectId}
        threadSituation={threadSituation}
      />
    </>
  );
};
