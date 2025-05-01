import React from "react";
import { getTasks } from "@/features/task/dao/task";
export default async function TaskPage() {
  const tasks = await getTasks();
  return (
    <div>
      <h1>Task</h1>
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </div>
  );
}
