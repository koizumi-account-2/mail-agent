import { prisma } from "@/lib/prisma";
import { CreateProjectForm } from "../types";

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
export const getProjectById = async (projectId: number) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      threads: true,
    },
  });
  return project;
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
