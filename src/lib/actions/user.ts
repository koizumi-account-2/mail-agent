///api/user/initialize
'use server'

const fastapi_base = 'http://localhost:8000/api/user';

// スレッドID一覧を取得（messages.list）
export async function initializeUser(email:string, refresh_token:string) {
  console.log("####initializeUser");
  const url = new URL(`${fastapi_base}/initialize`);

  const param = {
    email: email,
    refresh_token: refresh_token,
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(param),
    cache: 'no-cache',
  });
  if (!res.ok) throw new Error(`Failed to fetch thread list: ${res.statusText}`);
  const data:{message:string}   = await res.json();
  return data;
}