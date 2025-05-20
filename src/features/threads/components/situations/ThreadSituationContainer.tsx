import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { getThreadSituation } from "../../dao/situation";
import { auth } from "@/auth";
import { ThreadSituationEditCard } from "./ThreadSituationEditCard";
import { ThreadMessagesPresentationDialog } from "./ThreadMessagesPresentationDialog";
import { ThreadSituationUpdater } from "./ThreadSituationUpdater";
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

  // ユーザーの操作の不備を伝えたい
  const threadSituation = await getThreadSituation(projectId, threadId);
  // threadSituation.latestMessageIdを取得 : DB
  // console.log("現在のメールスレッドを取得");
  const mailThread = await getGmailMessageByThreadId(
    session.accessToken,
    session.user.email,
    threadId
  );

  const isLatest =
    mailThread.messages[0].id === threadSituation.latestMessageId;
  // console.log("メールスレッドを取得しました");
  return (
    <>
      <ThreadSituationEditCard
        threadSituation={threadSituation}
        mailThread={mailThread}
      />
      <ThreadMessagesPresentationDialog
        thread={mailThread}
        projectId={projectId}
      />
      {isLatest ? (
        <div className="flex flex-col gap-2">
          <p>最新のメールスレッドです</p>
        </div>
      ) : (
        <ThreadSituationUpdater
          threadSituation={threadSituation}
          projectId={projectId}
        />
      )}
    </>
  );
};
