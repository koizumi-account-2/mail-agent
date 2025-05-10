import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { getThreadSituation } from "../../dao/situation";
import { ThreadSituationPresentation } from "./ThreadSituationPresentation";
import { auth } from "@/auth";
import { ThreadSituationPresentationToEdit } from "./ThreadSituationPresentationToEdit";

type ThreadSituationContainerProps = {
  projectId: number;
  threadId: string;
  isEdit?: boolean;
};

export const ThreadSituationContainer = async ({
  projectId,
  threadId,
  isEdit,
}: ThreadSituationContainerProps) => {
  const session = await auth();

  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const threadSituation = await getThreadSituation(projectId, threadId);
  // threadSituation.latestMessageIdを取得 : DB
  console.log("現在のメールスレッドを取得");
  const thread = await getGmailMessageByThreadId(session.accessToken, threadId);
  console.log("メールスレッドを取得しました");
  return (
    <>
      {isEdit ? (
        <ThreadSituationPresentationToEdit
          projectId={projectId}
          threadSituation={threadSituation}
          thread={thread}
        />
      ) : (
        <ThreadSituationPresentation
          projectId={projectId}
          threadSituation={threadSituation}
          thread={thread}
        />
      )}
    </>
  );
};
