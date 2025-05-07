"use server"
import { auth } from "@/auth";
import { createProject } from "../dao/projectDao";
import { redirect } from "next/navigation";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}


export async function createProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const projectName = formData.get("projectName") as string;
  const session = await auth()
  const email = session?.user?.email
  if(!email){
    throw new Error("ログインしてください")
  }
  console.log("projectName",projectName);
  const project = await createProject({name: projectName, userId: email, description: ""}) 
  redirect(`/project/${project.id}`);

}
