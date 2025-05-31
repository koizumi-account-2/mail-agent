import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { getThreadSituation } from "../../dao/situation";
import { auth } from "@/auth";
import { ThreadSituationEditCard } from "./ThreadSituationEditCard";
import { ThreadMessagesPresentationDialog } from "./ThreadMessagesPresentationDialog";
import { ThreadSituationUpdater } from "./ThreadSituationUpdater";
import { CalendarEventContainer } from "@/features/calendar/components/CalendarEventContainer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type ThreadSituationContainerProps = {
  projectId: number;
  threadId: string;
  isReadOnly: boolean;
};

export const ThreadSituationContainer = async ({
  projectId,
  threadId,
  isReadOnly,
}: ThreadSituationContainerProps) => {
  const session = await auth();

  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const threadSituation = await getThreadSituation(projectId, threadId);
  console.log("threadSituation", threadSituation);
  // threadSituation.latestMessageIdを取得 : DB
  // console.log("現在のメールスレッドを取得");
  const mailThread = await getGmailMessageByThreadId(
    session.accessToken,
    session.user.email,
    threadId
  );
  console.log("mailThread", mailThread);
  const isLatest =
    mailThread.messages[0].id === threadSituation.latestMessageId;
  // console.log("メールスレッドを取得しました");
  return (
    <>
      <div>
        <ThreadSituationEditCard
          projectId={projectId}
          threadSituation={threadSituation}
          mailThread={mailThread}
          isLatest={isLatest}
        />
      </div>

      {/* <ThreadMessagesPresentationDialog
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
      )} */}
      <div>
        <CalendarEventContainer
          projectId={projectId}
          threadId={threadId}
          isReadOnly={isReadOnly}
        />
      </div>
    </>
  );
};
