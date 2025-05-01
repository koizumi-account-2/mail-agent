import { auth } from "@/auth";
import { getProjectById } from "@/features/project/actions/project";
import { ThreadContainer } from "@/features/threads/components/ThreadContainer";
import { TaskCreateForm } from "@/features/task/components/TaskCreateForm";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const project = await getProjectById(id);
  if (!project) {
    notFound();
  }

  // threadidを渡すと、threadの情報を表示するようなコンポーネントの作成。
  // その中では、threadの情報を表示する
  return (
    <div>
      <h1>Project: {project?.name}</h1>
      <div>
        {project?.threads.map((thread) => (
          <div key={thread.id}>
            threadSubject: {thread.subject}
            <br />
            threadId: {thread.id}
            <br />
            <h2>Task Create</h2>
            <TaskCreateForm projectId={id} threadId={thread.id} />
            <hr />
            <ThreadContainer projectId={id} threadId={thread.id} />
          </div>
        ))}
      </div>
      <Link href={`/threads?projectId=${id}`}>Import</Link>
    </div>
  );
}
