import React from "react";
import { getProjectsByUserId } from "@/features/project/dao/projectDao";
import Link from "next/link";
import { auth } from "@/auth";
import { ProjectSammaryPresentation } from "@/features/project/components/ProjectSammary/ProjectSammaryPresentation";
import { Button } from "@/components/ui/button";
export default async function ProjectPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("ログインしてください");
  }
  const projects = await getProjectsByUserId(session.user.email);
  return (
    <div className="flex flex-col gap-4">
      <h1>あなたのプロジェクト</h1>
      <div>
        {projects.map((project) => (
          <ProjectSammaryPresentation key={project.id} project={project} />
        ))}
      </div>
      <Button>
        <Link href={`/threads`}>0から作成</Link>
      </Button>
    </div>
  );
}
