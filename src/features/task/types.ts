
// タスクを作成するためのフォーム
export type CreateTaskForm = {
  projectId: number;
  threadId: string;
  title: string;
  description?: string;
  dueDate?: string; 
};