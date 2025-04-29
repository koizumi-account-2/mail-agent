"use server"
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}
export async function getAllProjects() {
  const projects = await prisma.project.findMany({});
  return projects;
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(id) },
    include: {
      threads: true,
    },
  });
  return project;
}

export async function createProject(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const projectName = formData.get("projectName") as string;
  console.log("projectName",projectName);
const project = await prisma.project.create({
    data: { name: projectName },
});
console.log("project",project);
redirect(`/project/${project.id}`);

}
