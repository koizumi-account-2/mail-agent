"use client";
import { ThreadSituation, ThreadDTO } from "../../types";
import { Button } from "@/components/ui/button";
import { analyzeMailMessages } from "../../actions/analyzeMailMessages";
import { insertThreadSituation } from "../../dao/situation";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { CustomeCard } from "@/components/common/CustomeCard";
import { ThreadMessagesPresentationDialog } from "./ThreadMessagesPresentationDialog";
import { createTasks } from "@/features/task/dao/task";
import { confirm } from "@/utils/confirm";
import EditableLabel from "@/components/common/input/Editablelabel";
import { HeaderGroupS } from "@/components/common/header/HeaderGroups";
import { HeaderS } from "@/components/common/header/Headers";
import { DescriptionS } from "@/components/common/header/Descriptions";
import Link from "next/link";
export const ThreadSituationPresentation = ({
  projectId,
  threadSituation,
  thread,
}: {
  projectId: number;
  threadSituation: ThreadSituation;
  thread: ThreadDTO;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const updateSituation = useCallback(async () => {
    setIsLoading(true);
    const response = await analyzeMailMessages(threadSituation);
    await insertThreadSituation(
      {
        ...threadSituation,
        notes: response.summary,
        latestMessageId: response.latest_message_id,
      },
      {
        locationName: response.company_location.company_name,
        locationAddress: response.company_location.company_address,
      }
    );
    const tasks = response.tasks.map((task) => ({
      projectId: projectId,
      threadId: threadSituation.threadId,
      title: task.task_name,
      description: "",
      status: "todo",
    }));
    await createTasks(tasks);
    router.refresh();
    setIsLoading(false);
  }, [projectId, threadSituation, router, setIsLoading]);
  const handleUpdateSituation = async () => {
    const result = await confirm("AIでスレッドの状況を更新しますか？");
    if (result) {
      await updateSituation();
    }
  };
  const handleRegister = async () => {
    const result = await confirm(
      "以下の情報で仮予定を検索しますか？\n" +
        threadSituation.thread?.locationName +
        "\n" +
        threadSituation.thread?.locationAddress
    );
    if (result) {
      router.push(
        `/calendar/register?name=${threadSituation.thread?.locationName}&address=${threadSituation.thread?.locationAddress}`
      );
    } else {
      router.push(`/project/${projectId}/edit`);
    }
  };

  console.log("threadSituation", threadSituation);
  const isLatest = thread.messages[0].id === threadSituation.latestMessageId;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {threadSituation.latestMessageId ? (
              <CustomeCard title="スレッドの状況" description="">
                <div className="flex justify-between">
                  <HeaderGroupS
                    headerTitle={threadSituation?.thread?.locationName ?? ""}
                    headerDescription={
                      threadSituation?.thread?.locationAddress ?? ""
                    }
                  />
                  <div>
                    <p>
                      {isLatest ? "最新の状態です" : "更新情報があります"}
                      <br />
                      最終更新：{threadSituation.updatedAt?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <>
                  <div className="y-1">
                    {threadSituation.notes?.split("。").map((note) => (
                      <div className="text-sm p-2" key={note}>
                        {note}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between gap-2">
                    <div className="flex gap-2">
                      <ThreadMessagesPresentationDialog
                        thread={thread}
                        projectId={projectId}
                      />

                      <Button onClick={handleRegister}>予定を登録</Button>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/project/${projectId}/edit`}>
                        <Button variant="outline">編集</Button>
                      </Link>
                      <Button onClick={handleUpdateSituation}>AI更新</Button>
                    </div>
                  </div>
                </>
              </CustomeCard>
            ) : (
              <div className="gap-2">
                <p>最新のメッセージがありません</p>
                <Button onClick={handleUpdateSituation}>
                  まずは分析してください
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

// {
//   threadSituation.notes?.split("。").map((note) => (
//     <div className="text-sm p-2" key={note}>
//       {note}
//     </div>
//   ));
// }
