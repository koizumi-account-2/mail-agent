import React from "react";
import { getProjectsByUserId } from "@/features/project/dao/projectDao";
import Link from "next/link";
import { auth } from "@/auth";
import { ProjectSammaryPresentation } from "@/features/project/components/ProjectSammary/ProjectSammaryPresentation";
import { Button } from "@/components/ui/button";
import { HeaderGroupL } from "@/components/common/header/HeaderGroups";
export default async function ProjectPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("ログインしてください");
  }
  const projects = await getProjectsByUserId(session.user.email);
  return (
    <div className="flex flex-col gap-4">
      <HeaderGroupL
        headerTitle="あなたのプロジェクト"
        headerDescription="プロジェクトを作成して、自分のプロジェクトを管理しましょう。"
      />
      <Button>
        <Link href={`/threads`}>新規作成</Link>
      </Button>
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectSammaryPresentation key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
