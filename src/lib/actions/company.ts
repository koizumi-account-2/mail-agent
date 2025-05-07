'use server'
import { CompanyInfoFullResult } from "@/features/company/types";
const fastapi_base = 'http://localhost:8000/api/agent/company';

// スレッドID一覧を取得（messages.list）
export async function getCompanyInfo(companyName: string) {
  const url = new URL(fastapi_base);

    const userInfo= {
        location: "新宿",
    }
    const param = {
        company_name: companyName,
        user_info: userInfo
    }
    console.log("param",param)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(param),
    cache: 'force-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:CompanyInfoFullResult   = await res.json();
  return data;
}



 // for(const message of sortedMessages){
  //   const mailBody = getMailBody(message.payload);
  //   console.log("--------------------------------");
  //   console.log("mailBody",mailBody);
  // }

