
// タスクを作成するためのフォーム
export type CreateTaskForm = {
  projectId: number;
  threadId: string;
  title: string;
  description?: string;
  dueDate?: string; 
};

export type Task = {
  id: number;
  projectId: number;
  threadId: string;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted: boolean;
  status: string;
};