import { ProjectContainer } from "@/features/project/components/projectEdit/ProjectContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Params = {
  params: Promise<{ id: string }>;
};
export default async function ProjectEditPage({ params }: Params) {
  const resolvedParams = await params;
  const projectId = Number(resolvedParams.id);
  return (
    <>
      <Link href={`/project/${projectId}`}>
        <Button variant="link">戻る</Button>
      </Link>
      <ProjectContainer projectId={projectId} />
    </>
  );
}
