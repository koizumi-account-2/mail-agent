import { zodResolver } from "@hookform/resolvers/zod";


import { z } from "zod";

const validationSchema = z.object({
  threadName: z.string().min(1, "スレッド名は必須です"),
  locationName: z
    .string()
    .max(10, "相手の会社名は10文字以内で入力してください"),
  locationAddress: z
    .string()
    .max(255, "相手の会社住所は255文字以内で入力してください")

});

export type ThreadInfoFormInputs = z.infer<typeof validationSchema>;

export const defaultValues: ThreadInfoFormInputs = {
  threadName: "sample",
  locationName: "sample",
  locationAddress: "sample",
};

export const resolver = zodResolver(validationSchema);