import { createTask } from "@/features/task/dao/task";
import { CreateTaskForm } from "@/features/task/types";
import { z } from "zod";

export const createTaskSchema = z.object({
  projectId: z.number(),
  threadId: z.string()
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export async function POST(req: Request) {

  try {
    const body = await req.json();
    const parsedBody = createTaskSchema.parse(body);
    const createTaskForm: CreateTaskForm = {
      projectId: parsedBody.projectId,
      threadId: parsedBody.threadId,
      title: "新しいタスクAPI",
      description: "新しいタスクの説明",
      dueDate: new Date().toISOString()
    }
    const task = await createTask(createTaskForm);

    return new Response(JSON.stringify(task), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });  
  } catch (error: unknown) {
    console.error("Task creation failed:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Invalid input" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}