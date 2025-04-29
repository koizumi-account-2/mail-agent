import React from "react";
import { CreateProjectForm } from "./CreateProjectForm";
import { auth } from "@/auth";
export default async function CreateProjectPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("ログインしてください");
  }
  return (
    <div>
      <h1>CreateProjectPage</h1>
      <CreateProjectForm />
    </div>
  );
}
