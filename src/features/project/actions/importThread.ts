"use server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { createProject, getProjectById } from "../dao/projectDao"
import { CreateProjectForm } from "../types"
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

    console.log("projectId", projectId)
    // プロジェクトが指定されていない場合
    if (!projectId) {
      console.log("projectIdが指定されていません")
      // まずProjectを作成
      const createProjectForm: CreateProjectForm = {
        name: `project-${threadId}`,
        userId: email,
        description: "test"
      }
      const project = await createProject(createProjectForm)
      projectIdNum = project.id
    }else{
      // プロジェクトが指定されている場合は存在するか確認
      const project = await getProjectById(projectIdNum)
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
        locationName: "",
        locationAddress: "",
      },
    });

    redirect(`/project/${projectIdNum}`)
}