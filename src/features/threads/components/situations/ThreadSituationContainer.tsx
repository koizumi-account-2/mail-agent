import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { getThreadSituation } from "../../dao/situation";
import { ThreadSituationPresentation } from "./ThreadSituationPresentation";
import { auth } from "@/auth";

type ThreadSituationContainerProps = {
  projectId: number;
  threadId: string;
};

export const ThreadSituationContainer = async ({
  projectId,
  threadId,
}: ThreadSituationContainerProps) => {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  console.log("projectId, threadId", projectId, threadId);
  const threadSituation = await getThreadSituation(projectId, threadId);
  // threadSituation.latestMessageIdを取得 : DB
  const thread = await getGmailMessageByThreadId(session.accessToken, threadId);
  console.log("thread", thread?.messages[0].id);
  return (
    <ThreadSituationPresentation
      projectId={projectId}
      threadSituation={threadSituation}
      thread={thread}
    />
  );
};
