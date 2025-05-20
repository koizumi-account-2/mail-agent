import { prisma } from "@/lib/prisma";
import { CreateProjectForm, ProjectDTO } from "../types";

export const createProject = async (projectForm: CreateProjectForm) => {
  const project = await prisma.project.create({
    data: projectForm,
  });
  return project;
};
export async function getAllProjects() {
  const projects = await prisma.project.findMany({});
  return projects;
}
export const getProjectById = async (projectId: number): Promise<ProjectDTO | null> => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      threads: true,
    },
  });
  if (!project) {
    return null;
  }else{
    return {
      id: project.id,
      name: project.name,
      userId: project.userId,
      description: project.description,
      threads: project.threads,
    };
  }

};

export const getProjectsByUserId = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { userId },
    include: {
      threads: true,
    },
  });
  return projects;
};

export const updateProject = async (projectId: number, projectName: string, projectDescription: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!project) {
    throw new Error("プロジェクトが見つかりません");
  }
  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      name: projectName,
      description: projectDescription,
    },
  });
  return updatedProject;
};