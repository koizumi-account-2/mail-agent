import { getTasksByThreadIdAndProjectId } from "../dao/task";
import { TaskPresentation } from "./TaskPresentation";

export const TaskContainer = async ({
  projectId,
  threadId,
}: {
  projectId: number;
  threadId: string;
}) => {
  const tasks = await getTasksByThreadIdAndProjectId(threadId, projectId);
  return (
    <div>
      {tasks.map((task) => (
        <TaskPresentation key={task.id} task={task} />
      ))}
    </div>
  );
};
