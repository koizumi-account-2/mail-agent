"use server";
import { redirect } from "next/navigation";
import { CreateTaskForm } from "../types";
import { createTask } from "../dao/task";   
type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}
export async function createTaskAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
    const projectId = formData.get("projectId") as string;
    const threadId = formData.get("threadId") as string;
    console.log("project",projectId);
    console.log("thread",threadId);
    const createTaskForm: CreateTaskForm = {
        projectId: Number(projectId),
        threadId: threadId,
        title: "新しいタスク",
        description: "新しいタスクの説明",
        dueDate: new Date().toISOString()
    }
    const task = await createTask(createTaskForm);
    console.log("taskが作成されました",task);
    redirect(`/project/${projectId}`);
}