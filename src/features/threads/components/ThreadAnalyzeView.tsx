"use client";
import React, { useState } from "react";
import { MailMessageDTO, ThreadDTO, TaskKari, ThreadSituation } from "../types";
import MailMessageContainer from "./MailMessageContainer";
import { analyzeMailMessages } from "../actions/analyzeMailMessages";
import { insertThreadSituation } from "../dao/situation";
//このコンポーネントから、agentによるanalyzeの呼び出しを行う
// ここから、DBへの格納も行う。
// 命名は変えた方がいい

export const ThreadAnalyzeView = ({
  projectId,
  thread,
  threadSituation,
}: {
  projectId: string;
  thread: ThreadDTO;
  threadSituation: ThreadSituation;
}) => {
  const [analyzeSummary, setAnalyzeSummary] = useState("");
  const [tasks, setTasks] = useState<TaskKari[]>([]);
  const [inputThreadSituation, setInputThreadSituation] =
    useState<ThreadSituation>(
      threadSituation || {
        projectId: Number(projectId),
        threadId: thread.threadId,
        status: "",
        latestMessageId: "",
        notes: "",
      }
    );

  // agentによるanalyzeの呼び出し
  const handleAnalyze = async () => {
    const res = await analyzeMailMessages(
      thread?.messages ?? [],
      inputThreadSituation
    );
    const insertedThreadSituation = await insertThreadSituation({
      ...inputThreadSituation,
      threadId: thread.threadId,
      notes: res.summary,
      latestMessageId: thread.messages[0].id,
    });
    console.log("insertedThreadSituation", insertedThreadSituation);
    setAnalyzeSummary(res.summary);
    setTasks(res.tasks);
    setInputThreadSituation({
      ...inputThreadSituation,
      notes: insertedThreadSituation.notes ?? "",
      latestMessageId: insertedThreadSituation.latestMessageId ?? "",
    });
  };
  return (
    <div>
      <h1>Thread-{thread.threadId}</h1>
      ThreadAnalyzeView:{projectId}
      <pre>{JSON.stringify(threadSituation, null, 2)}</pre>
      <h3>過去の状況</h3>
      <div>
        <h4>直近の状況</h4>
        <textarea
          value={inputThreadSituation.notes}
          onChange={(e) =>
            setInputThreadSituation({
              ...inputThreadSituation,
              notes: e.target.value,
            })
          }
        ></textarea>
      </div>
      <button onClick={handleAnalyze}>分析</button>
      <div className="flex flex-col gap-2">
        {analyzeSummary && <div>分析結果：{analyzeSummary}</div>}
        {tasks.length > 0 && (
          <div>
            {tasks.map((task) => (
              <div key={task.taskName}>
                {task.taskName}：{task.assignedTo}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {thread.messages.map((message: MailMessageDTO) => (
          <MailMessageContainer key={message.id} mailMessage={message} />
        ))}
      </div>
    </div>
  );
};
