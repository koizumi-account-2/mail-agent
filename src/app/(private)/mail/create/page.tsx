import { Button } from "@/components/ui/button";
import { MailCreator } from "@/features/mail/components/MailCreator";
import Link from "next/link";

type Params = {
  projectId?: number;
  threadId?: string;
  skey?: string; // 参照するオブジェクトのキー
  mode?: "candidate" | "draft";
};

export default async function MailCreatePage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { projectId, threadId, skey, mode } = await searchParams;

  return (
    <div>
      <h1>メール作成</h1>
      <p>プロジェクトID: {projectId}</p>
      <p>スレッドID: {threadId}</p>
      <p>skey: {skey}</p>
      <p>mode: {mode}</p>
      {skey ? (
        <MailCreator skey={skey} projectId={Number(projectId)} />
      ) : (
        <Button>
          <Link href={`/calendar/candidate?projectId=${projectId}&from=mail`}>
            候補日を選択する
          </Link>
        </Button>
      )}
    </div>
  );
}

// mailの作成
// mailのタイプ： 予定
