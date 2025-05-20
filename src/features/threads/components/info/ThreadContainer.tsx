import { notFound } from "next/navigation";

import { ThreadInfoEditCard } from "./ThreadInfoEditCard";
import { MailThreadDTO, ThreadDTO } from "../../types";
import { getThreadById } from "../../dao/thread";
import { ThreadMessagesPresentationDialog } from "../situations/ThreadMessagesPresentationDialog";
import { getGmailMessageByThreadId } from "@/lib/actions/getmail";
import { auth } from "@/auth";
export const ThreadContainer = async ({
  projectId,
  threadId,
}: {
  projectId: number;
  threadId: string;
}) => {
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const thread: ThreadDTO = await getThreadById(threadId, projectId);
  const mailThread: MailThreadDTO = await getGmailMessageByThreadId(
    session.accessToken,
    session.user.email,
    threadId
  );
  if (!thread) {
    notFound();
  }
  return (
    <>
      <ThreadInfoEditCard
        key={thread.id}
        thread={thread}
        projectId={projectId}
      />
      <ThreadMessagesPresentationDialog
        thread={mailThread}
        projectId={projectId}
      />
    </>
  );
};
