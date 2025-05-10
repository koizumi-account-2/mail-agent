import { auth } from "@/auth";
import { getProjectById } from "@/features/project/dao/projectDao";
import { notFound } from "next/navigation";
import { ThreadSituationContainer } from "@/features/threads/components/situations/ThreadSituationContainer";
import { TaskContainer } from "@/features/task/components/TaskContainer";
import { DividedLayout } from "@/components/layout/DividedLayout";

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
  const left = (
    <>
      状況
      <ThreadSituationContainer
        projectId={Number(id)}
        threadId={project?.threads[0].id}
      />
    </>
  );
  const right = (
    <TaskContainer projectId={Number(id)} threadId={project?.threads[0].id} />
  );
  // threadidを渡すと、threadの情報を表示するようなコンポーネントの作成。
  // その中では、threadの情報を表示する
  return <DividedLayout left={left} right={right} />;
}
