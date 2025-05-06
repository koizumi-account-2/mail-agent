import { ProjectDTO } from "../../types";
export const ProjectContainer = async ({
  project,
}: {
  project: ProjectDTO;
}) => {
  return <div>{project.name}</div>;
};
