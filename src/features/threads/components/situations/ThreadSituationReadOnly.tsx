"use server";
import { getThreadSituation } from "../../dao/situation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CustomeCard } from "@/components/common/CustomeCard";
// スレッド状況の表示
export const ThreadSituationReadOnly = async ({
  projectId,
  threadId,
}: {
  projectId: number;
  threadId: string;
}) => {
  const threadSituation = await getThreadSituation(projectId, threadId);
  return (
    <CustomeCard title="スレッド状況" description="">
      {/* TODO スレッド情報を表示する */}
      <Link href={`/project/${projectId}/${threadId}/situation`}>
        <Button variant="link">
          {threadSituation.thread?.subject ||
            `スレッド名がありません:${threadSituation.thread?.id}`}
        </Button>
      </Link>
      <p>{threadSituation.notes}</p>
    </CustomeCard>
  );
};
