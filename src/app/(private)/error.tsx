"use client";

import { signOut } from "next-auth/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const logout = async () => {
    await signOut({ redirectTo: "/login" });
  };
  console.log(
    "error",
    error,
    typeof error,
    error instanceof Error,
    error.message
  );
  return (
    <div className="text-red-600 p-4">
      <h2>エラー</h2>
      <p>{error.message ? error.message : "不明なエラー"}</p>
      <button onClick={reset} className="mt-4 underline">
        再読み込み
      </button>
      <button onClick={logout} className="mt-4 underline">
        ログアウト
      </button>
    </div>
  );
}
