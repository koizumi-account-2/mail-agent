import { auth } from "@/auth";
import { ThreadSituationContainer } from "@/features/threads/components/situations/ThreadSituationContainer";
import { use } from "react";
type Params = {
  params: Promise<{ id: string; threadId: string }>;
};

export default async function ThreadSituationPage({ params }: Params) {
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }

  const id = resolvedParams.id;
  const threadId = resolvedParams.threadId;
  // threadidを渡すと、threadの情報を表示するようなコンポーネントの作成。
  // その中では、threadの情報を表示する
  return (
    <>
      <ThreadSituationContainer projectId={Number(id)} threadId={threadId} />
    </>
  );
}
