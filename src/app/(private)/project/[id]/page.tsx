import { auth } from "@/auth";
import { getProjectById } from "@/features/project/dao/projectDao";
import { notFound } from "next/navigation";
import { ThreadSituationContainer } from "@/features/threads/components/situations/ThreadSituationContainer";
import { TaskContainer } from "@/features/task/components/TaskContainer";
import { HeaderGroupL } from "@/components/common/header/HeaderGroups";
type Params = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Params) {
  const resolvedParams = await params;
  const session = await auth();
  if (!session?.user?.email || !session?.accessToken) {
    throw new Error("不正なリクエストです");
  }
  const id = resolvedParams.id;
  const project = await getProjectById(Number(id));
  console.log(project);
  if (!project) {
    notFound();
  }
  // threadidを渡すと、threadの情報を表示するようなコンポーネントの作成。
  // その中では、threadの情報を表示する
  return (
    <>
      <HeaderGroupL
        headerTitle={project.name}
        headerDescription={project.description}
      />
      <ThreadSituationContainer
        projectId={Number(id)}
        threadId={project?.threads[0].id}
      />
      <TaskContainer projectId={Number(id)} threadId={project?.threads[0].id} />
    </>
  );
}
