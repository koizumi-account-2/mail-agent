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
    await updateSituation();
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
              <CustomeCard
                title={threadSituation?.thread?.locationName ?? ""}
                description={threadSituation?.thread?.locationAddress ?? ""}
              >
                <div className="flex flex-row gap-2 items-center">
                  <Button onClick={handleUpdateSituation}>
                    {isLatest ? "最新の状態です" : "更新する"}
                  </Button>
                  <div>
                    最終更新：{threadSituation.updatedAt?.toLocaleString()}
                  </div>
                </div>

                {threadSituation.notes?.split("。").map((note) => (
                  <div className="text-sm p-2" key={note}>
                    {note}
                  </div>
                ))}
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
          <Button onClick={handleRegister}>register</Button>
          <ThreadMessagesPresentationDialog
            thread={thread}
            projectId={projectId}
          />
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
