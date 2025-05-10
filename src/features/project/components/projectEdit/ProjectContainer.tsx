import { notFound } from "next/navigation";
import { getProjectById } from "../../dao/projectDao";
import { ProjectEditPresentation } from "./ProjectEditPresentation";
import { ThreadSituationContainer } from "@/features/threads/components/situations/ThreadSituationContainer";
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
      <ProjectEditPresentation project={project} />
      <ThreadSituationContainer
        projectId={projectId}
        threadId={project?.threads[0].id}
        isEdit={true}
      />
    </>
  );
};
