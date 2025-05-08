"use client";
import React, { useActionState } from "react";
import { FcGoogle } from "react-icons/fc";
import { googleAuthenticate } from "@/lib/actions/authenticate";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  const [errorMessage, formAction] = useActionState(
    googleAuthenticate,
    undefined
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>
        <form action={formAction}>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              type="submit"
            >
              <FcGoogle className="h-5 w-5" />
              Googleでログイン
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
