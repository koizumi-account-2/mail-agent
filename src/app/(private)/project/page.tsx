import React from "react";
import { getAllProjects } from "@/features/project/actions/project";
import Link from "next/link";
export default async function ProjectPage() {
  const projects = await getAllProjects();
  return (
    <div>
      <h1>Project</h1>
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <Link href={`/project/${project.id}`}>{project.name}</Link>
          </div>
        ))}
      </div>
      <Link href={`/threads`}>0から作成</Link>
    </div>
  );
}
