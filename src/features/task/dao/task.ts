import { CreateTaskForm } from "../types";
import { prisma } from "@/lib/prisma";

// タスクを作成
export async function createTask(createTaskForm: CreateTaskForm) {
  const task = await prisma.task.create({
    data: createTaskForm,
  });
  return task;
}

// 全てのタスクを取得
export async function getTasks() {
  const tasks = await prisma.task.findMany();
  return tasks;
}