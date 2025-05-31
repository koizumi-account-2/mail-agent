"use server"
import { redirect } from "next/navigation"
import { getSituationById,insertThreadSituation } from "../dao/situation"
import { ThreadSituation } from "../types"
import { revalidatePath } from "next/cache"
type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

// スレッドを作成
// プロジェクトが指定されていない場合は新規作成
// プロジェクトが指定されている場合は紐付
export async function updateThreadSituation(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState>{
    const threadSituationId = formData.get('threadSituationId') as string
    const notes = formData.get('notes') as string
    console.log("threadSituationId", threadSituationId)
    console.log("notes", notes)
    const threadSituation = await getSituationById(Number(threadSituationId))
    if(!threadSituation){
        throw new Error('スレッド情報が見つかりません')
    }

    const updatedSituation:ThreadSituation = {
        ...threadSituation,
        notes:notes,
    }
    await insertThreadSituation(updatedSituation)

    revalidatePath(`/project/${threadSituation.projectId}/${threadSituation.threadId}/situation`)
    //redirect(`/project/${threadSituation.projectId}/${threadSituation.threadId}/situation`)
    return {
        success: true,
        errors: {}
    }
}