import { useState } from "react";
import { insertThreadSituation } from "../dao/situation";
import { analyzeMailMessages } from "../actions/analyzeMailMessages";
import { createTasks } from "@/features/task/dao/task";
import { ThreadSituation } from "../types";

export const useUpdateMailThreadSituation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const updateSituation = async ({threadSituation,projectId}:{threadSituation: ThreadSituation,projectId:number}) => {
    setIsLoading(true);
    setStatusMessage("メールスレッドの分析が開始されました");
    const response = await analyzeMailMessages(threadSituation);
    setStatusMessage("分析結果をDBに保存中です");
    await insertThreadSituation(
        {
            ...threadSituation,
            notes: response.summary,
            latestMessageId: response.latest_message_id,
        }
    );
    const tasks = response.tasks.map((task) => ({
      projectId: projectId,
      threadId: threadSituation.threadId,
      title: task.task_name,
      description: "",
      status: "todo",
    }));
    setStatusMessage("タスクの作成が開始されました");
    await createTasks(tasks);
    setIsLoading(false);
    setStatusMessage("");
  };
  return { updateSituation, isLoading, statusMessage };
};
