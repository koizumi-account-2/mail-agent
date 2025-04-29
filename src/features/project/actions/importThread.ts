"use server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

// スレッドを作成
// プロジェクトが指定されていない場合は新規作成
// プロジェクトが指定されている場合は紐付
export async function importThread(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState>{
    const threadId = formData.get('threadId') as string
    const projectId = formData.get('projectId') as string

    let projectIdNum = Number(projectId)
    // DB保存
    const session = await auth()
    const email = session?.user?.email

    if(!email){
      throw new Error('不正なリクエストです')
    }

    if(!threadId){
      throw new Error('threadIdが指定されていません')
    }

    // プロジェクトが指定されていない場合
    if (!projectId) {
    // まずProjectを作成
      const project = await prisma.project.create({
        data: {
          name: `project-${threadId}`,
        },
      });
      projectIdNum = project.id
    }else{
      // プロジェクトが指定されている場合は存在するか確認
      const project = await prisma.project.findUnique({
        where: { id: projectIdNum },
      });
      if (!project) {
        throw new Error(`Project ID ${projectId} does not exist`);
      }
    }
    // Threadを作成（手動でid指定）
    await prisma.thread.create({
      data: {
        id: threadId,
        subject: "test",
        projectId: projectIdNum, // Projectに紐づけ
      },
    });

    redirect(`/project/${projectIdNum}`)
}