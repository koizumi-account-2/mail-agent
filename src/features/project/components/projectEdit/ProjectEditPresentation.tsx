"use client";
import React, { useActionState, useState } from "react";
import { ProjectDTO } from "../../types";
import { InputWithLabel } from "@/components/common/input/InputWithLabel";
import { updateProjectAction } from "../../actions/project";
import { Button } from "@/components/ui/button";
import { CustomeCard } from "@/components/common/CustomeCard";

export const ProjectEditPresentation = ({
  project,
}: {
  project: ProjectDTO;
}) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [, formAction, isPending] = useActionState(updateProjectAction, {
    success: false,
    errors: {},
  });
  return (
    <CustomeCard title="プロジェクト編集" description="">
      <form action={formAction}>
        <div className="flex flex-col gap-4">
          <input type="hidden" name="projectId" value={project.id} />
          <InputWithLabel
            label="プロジェクト名"
            id="projectName"
            name="projectName"
            type="text"
            className="w-1/2"
            placeholder="プロジェクト名を入力してください"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputWithLabel
            label="プロジェクト説明"
            id="projectDescription"
            name="projectDescription"
            type="text"
            placeholder="プロジェクト説明を入力してください"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-start">
            <Button type="submit" disabled={isPending}>
              更新
            </Button>
          </div>
        </div>
      </form>
    </CustomeCard>
  );
};
