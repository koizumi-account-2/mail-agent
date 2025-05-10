"use server"
import { redirect } from "next/navigation"
import { getSituationById,updateThreadSituationNoteAndLocation } from "../dao/situation"
import { ThreadSituation } from "../types"
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
    const projectId = formData.get('projectId') as string
    const companyName = formData.get('companyName') as string
    const companyAddress = formData.get('companyAddress') as string
    const notes = formData.get('notes') as string
    console.log("threadSituationId", threadSituationId)
    console.log("projectId", projectId)
    console.log("companyName", companyName)
    console.log("companyAddress", companyAddress)
    console.log("notes", notes)
    const threadSituation = await getSituationById(Number(threadSituationId))
    if(!threadSituation){
        throw new Error('スレッド情報が見つかりません')
    }

    const updatedSituation:ThreadSituation = {
        ...threadSituation,
        notes:notes,
    }
    await updateThreadSituationNoteAndLocation(updatedSituation, {locationName:companyName,locationAddress:companyAddress})

    redirect(`/project/${projectId}`)
}