"use client";
import { createProjectAction } from "@/features/project/actions/project";
import React, { useActionState, useState } from "react";

export const CreateProjectForm = () => {
  const [state, formAction] = useActionState(createProjectAction, {
    success: false,
    errors: {},
  });
  const [projectName, setProjectName] = useState("");
  return (
    <form action={formAction}>
      <input
        type="text"
        name="projectName"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
