"use client";
import { ThreadSituation, ThreadDTO } from "../../types";
import { Button } from "@/components/ui/button";
import { analyzeMailMessages } from "../../actions/analyzeMailMessages";
import { insertThreadSituation } from "../../dao/situation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CustomeCard } from "@/components/common/CustomeCard";
import { ThreadMessagesPresentation } from "./ThreadMessagesPresentation";
import { createTasks } from "@/features/task/dao/task";
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
  const handleUpdateSituation = async () => {
    setIsLoading(true);
    const response = await analyzeMailMessages(threadSituation);
    await insertThreadSituation({
      ...threadSituation,
      notes: response.summary,
      latestMessageId: response.latest_message_id,
    });
    const tasks = response.tasks.map((task) => ({
      projectId: projectId,
      threadId: threadSituation.threadId,
      title: task.task_name,
      description: "",
      status: "todo",
    }));
    console.log("tasks", tasks);
    await createTasks(tasks);
    router.refresh();
    setIsLoading(false);
  };
  const isLatest = thread.messages[0].id === threadSituation.latestMessageId;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <CustomeCard title="" description="">
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
          </div>
          <ThreadMessagesPresentation thread={thread} projectId={projectId} />
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
