import { zodResolver } from "@hookform/resolvers/zod";


import { z } from "zod";

const validationSchema = z.object({
  notes: z.string().max(100, "メモは100文字以内で入力してください"),
});

export type ThreadSituationFormInputs = z.infer<typeof validationSchema>;

export const defaultValues: ThreadSituationFormInputs = {
  notes: "sample",
};

export const resolver = zodResolver(validationSchema);