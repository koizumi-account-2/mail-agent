"use server"
import { auth } from "@/auth";
import { getCompanyInfo } from "@/lib/actions/company";
import { redirect } from "next/navigation";


type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}


// export async function getAvailableSlotByCompany(
//   prevState: ActionState,
//   formData: FormData
// ): Promise<ActionState> {
//   const companyName = formData.get("companyName") as string;
//   const session = await auth()
//   const email = session?.user?.email
//   if(!email){
//     throw new Error("ログインしてください")
//   }
//   const companyInfo = await getCompanyInfo(session.accessToken, companyName)
//   console.log(companyInfo)
//   redirect(`/calendar`);

// }
