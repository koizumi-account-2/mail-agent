import { signOut } from "@/auth";
import Link from "next/link";
import React from "react";

export default async function page() {
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
    </>
  );
}
