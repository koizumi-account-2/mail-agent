import { notFound } from "next/navigation";
import { getProjectById } from "../../dao/projectDao";
import { ProjectEditCard } from "./ProjectEditCard";
import { ThreadSituationReadOnly } from "@/features/threads/components/situations/ThreadSituationReadOnly";
import { CalendarEventContainer } from "@/features/calendar/components/CalendarEventContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
      <ProjectEditCard project={project} />
      <>
        <Button>
          <Link href={`/mail/create?projectId=${projectId}`}>メール作成</Link>
        </Button>
      </>
      {project.threads.map((thread) => (
        <div key={thread.id} className="flex flex-col gap-2">
          <ThreadSituationReadOnly
            key={thread.id}
            projectId={projectId}
            threadId={thread.id}
          />
          <CalendarEventContainer
            projectId={projectId}
            threadId={thread.id}
            isReadOnly={true}
          />
        </div>
      ))}
    </>
  );
};
