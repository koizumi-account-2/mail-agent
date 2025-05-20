import { auth } from "@/auth";
import { ThreadContainer } from "@/features/threads/components/info/ThreadContainer";

type Params = {
  params: Promise<{ id: string; threadId: string }>;
};

export default async function ProjectThreadPage({ params }: Params) {
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
      <ThreadContainer projectId={Number(id)} threadId={threadId} />
    </>
  );
}
