"use client";
import { importThread } from "@/features/project/actions/importThread";
import React, { useActionState, useState } from "react";
import { ThreadDTO } from "@/features/threads/types";
// projectIdを渡すと、そのプロジェクトに紐づける
// 渡さなければ、プロジェクトも新規作成
export const ImportMailForm = ({
  thread,
  projectId,
}: {
  thread: ThreadDTO;
  projectId: string;
}) => {
  const [state, formAction] = useActionState(importThread, {
    success: false,
    errors: {},
  });
  const [threadId, setThreadId] = useState(thread.threadId);
  const [inputProjectId, setInputProjectId] = useState(projectId);
  return (
    <form action={formAction}>
      <input
        type="text"
        name="threadId"
        value={threadId}
        onChange={(e) => setThreadId(e.target.value)}
      />
      <input
        type="text"
        name="projectId"
        value={inputProjectId}
        onChange={(e) => setInputProjectId(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
