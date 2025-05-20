import { ThreadDTO } from "../threads/types";

export type CreateProjectForm = {
  name: string;
  userId: string;
  description: string;
};


export type ProjectDTO = {
  id: number;
  name: string;
  userId: string;
  description: string;
  threads: ThreadDTO[];
};
