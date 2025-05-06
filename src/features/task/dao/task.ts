"use server";
import { CreateTaskForm, Task } from "../types";
import { prisma } from "@/lib/prisma";

// タスクを作成
export async function createTask(createTaskForm: CreateTaskForm) {
  const task = await prisma.task.create({
    data: createTaskForm,
  });
  return task;
}

// タスクを作成
export async function createTasks(createTaskForms: CreateTaskForm[]) {
  console.log("createTaskForms", createTaskForms);
  const tasks = await prisma.task.createMany({
    data: createTaskForms,
  });
  return tasks;
}


// 全てのタスクを取得
export async function getTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}

export async function getTasksByThreadIdAndProjectId(threadId: string, projectId: number) {
  const tasks = await prisma.task.findMany({
    where: {
      threadId: threadId,
      projectId: projectId,
    },
  });

  const tasksResult:Task[] = tasks.map((task) => ({
    id: task.id,
    projectId: task.projectId,
    threadId: task.threadId,
    title: task.title,
    description: task.description ?? "",
    dueDate: task.dueDate ? task.dueDate.toISOString() : "",
    isCompleted: task.isCompleted,
    status: task.status,
  }));
  return tasksResult;
}
  // projectId   Int
  // threadId    String
  // title       String
  // description String?
  // dueDate     DateTime?