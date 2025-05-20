import { zodResolver } from "@hookform/resolvers/zod";


import { z } from "zod";

const validationSchema = z.object({
  projectName: z
    .string()
    .min(1, "プロジェクト名は必須です")
    .max(10, "プロジェクト名は10文字以内で入力してください"),
  projectDescription: z
    .string()
    .min(1, "プロジェクト説明は必須です")
    .max(100, "プロジェクト説明は100文字以内で入力してください"),
});

export type ProjectInfoFormInputs = z.infer<typeof validationSchema>;

export const defaultValues: ProjectInfoFormInputs= {
    projectName: "sample",
    projectDescription: "sample",
};

export const resolver = zodResolver(validationSchema);