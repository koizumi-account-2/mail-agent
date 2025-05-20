import { auth } from "@/auth";
import { ProjectContainer } from "@/features/project/components/projectEdit/ProjectContainer";

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

  // threadidを渡すと、threadの情報を表示するようなコンポーネントの作成。
  // その中では、threadの情報を表示する
  return (
    <>
      <ProjectContainer projectId={Number(id)} />
    </>
  );
}
