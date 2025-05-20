import { notFound } from "next/navigation";
import { getProjectById } from "../../dao/projectDao";
import { ProjectEditCard } from "./ProjectEditCard";
export const ProjectContainer = async ({
  projectId,
}: {
  projectId: number;
}) => {
  const project = await getProjectById(projectId);
  if (!project) {
    notFound();
  }
  return (
    <>
      <ProjectEditCard project={project} />
    </>
  );
};
