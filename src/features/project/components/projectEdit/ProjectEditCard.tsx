"use client";
import React, { useActionState } from "react";
import { ProjectDTO } from "../../types";
import { updateProjectAction } from "../../actions/project";
import { CustomeCard } from "@/components/common/CustomeCard";
import { useProjectInfoForm } from "../../hooks/useProjectInfoForm";
import { ProjectInfoFormInputs } from "@/validations/projectInfoValidation";
import { Form } from "@/components/ui/form";

import { TextBoxField } from "@/components/formitem/TextBoxField";
import { TextareaField } from "@/components/formitem/TextareaField";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const ProjectEditCard = ({ project }: { project: ProjectDTO }) => {
  console.log(project);
  const { form } = useProjectInfoForm({
    projectName: project.name,
    projectDescription: project.description,
  });
  const [, formAction, isPending] = useActionState(updateProjectAction, {
    success: false,
    errors: {},
  });
  return (
    <>
      <CustomeCard title="プロジェクト情報" description="">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <div className="flex flex-col gap-4">
              <input type="hidden" name="projectId" value={project.id} />
              <TextBoxField
                form={form}
                fieldName="projectName"
                label="プロジェクト名"
                placeholder="例: プロジェクト名"
                type="text"
                textClassName="w-full"
              />
              <TextareaField
                form={form}
                fieldName="projectDescription"
                label="プロジェクト説明"
                placeholder="例: プロジェクト説明"
              />
            </div>
            <Button
              type="submit"
              disabled={
                isPending || !form.formState.isValid || !form.formState.isDirty
              }
            >
              更新
            </Button>
          </form>
        </Form>
      </CustomeCard>
    </>
  );
};
