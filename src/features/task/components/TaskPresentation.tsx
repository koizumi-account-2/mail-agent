"use client";

import { Task } from "../types";

export const TaskPresentation = ({ task }: { task: Task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};
