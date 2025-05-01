"use client";
import React, { useActionState, useState } from "react";
import { createTaskAction } from "../actions/taskActions";
export const TaskCreateForm = ({
  projectId,
  threadId,
}: {
  projectId: string;
  threadId: string;
}) => {
  const [inputProjectId, setInputProjectId] = useState(projectId);
  const [inputThreadId, setInputThreadId] = useState(threadId);
  const [state, formAction] = useActionState(createTaskAction, {
    success: false,
    errors: {},
  });
  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="projectId"
        value={inputProjectId}
        onChange={(e) => setInputProjectId(e.target.value)}
      />
      <input
        type="hidden"
        name="threadId"
        value={inputThreadId}
        onChange={(e) => setInputThreadId(e.target.value)}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};
