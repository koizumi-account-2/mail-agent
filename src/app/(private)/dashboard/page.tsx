import { signOut, auth } from "@/auth";
import Link from "next/link";
import React from "react";

export default async function page() {
  const session = await auth();
  console.log(session?.accessToken);
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <div>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
      <div>
        <Link href="/threads">スレッド一覧</Link>
      </div>
      <div>
        <Link href="/project">プロジェクト一覧</Link>
      </div>
      <p>{session?.accessToken}</p>
    </>
  );
}
