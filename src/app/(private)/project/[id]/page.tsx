import { getProjectById } from "@/features/project/actions/project";
import Link from "next/link";
import { notFound } from "next/navigation";
type Params = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Params) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }
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
          </div>
        ))}
      </div>
      <Link href={`/threads?projectId=${id}`}>Import</Link>
    </div>
  );
}
