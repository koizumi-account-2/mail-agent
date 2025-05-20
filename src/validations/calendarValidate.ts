import { zodResolver } from "@hookform/resolvers/zod";
import { format, startOfToday } from "date-fns";
import { isBefore } from "date-fns";
import { parseISO, isValid } from "date-fns";

import { z } from "zod";

const validationSchema = z.object({
  travelTimeMinutes: z
        .coerce
        .number({ required_error: "移動時間は必須です" })
        .min(4, "移動時間は4分以上にしてください")
        .max(120, "移動時間は120分以内にしてください")
  ,
  durationMinutes: z.coerce.number({ required_error: "イベント時間は必須です" })
        .int({ message: "イベント時間は整数で入力してください" })
        .min(1, "イベント時間は1分以上にしてください")
        .max(120, "イベント時間は120分以内にしてください")
  ,
  maxCandidatesPerDay: z.coerce.number({ required_error: "最大候補日数は必須です" })
        .int({ message: "最大候補日数は整数で入力してください" })
        .min(1, "最大候補日数は1日以上にしてください")
        .max(10, "最大候補日数は10日以内にしてください")
  ,
  span: z.coerce.number({ required_error: "検索期間は必須です" })
        .int({ message: "検索期間は整数で入力してください" })
        .min(1, "検索期間は1日以上にしてください")
        .max(30, "検索期間は30日以内にしてください")
  ,
  from: z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "日付は yyyy-mm-dd 形式で入力してください",
    })
    .refine((val) => {
      const parsed = parseISO(val)
      return isValid(parsed) && !isBefore(parsed, startOfToday())
    }, {
      message: "日付は今日以降の日付を入力してください",
    }),
});

export type CandidateFormInputs = z.infer<typeof validationSchema>;

export const defaultValues: CandidateFormInputs= {
    travelTimeMinutes: 30,
    durationMinutes: 60,
    maxCandidatesPerDay: 2,
    span: 7,
    from: format(new Date(), "yyyy-MM-dd"),
};

export const resolver = zodResolver(validationSchema);