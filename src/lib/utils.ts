import { EventTime } from "@/features/calendar/types";
import { ja } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { addDays, format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateTime:EventTime): string {
  if (!dateTime) return "";
  if (dateTime.dateTime) {
    return format(new Date(dateTime.dateTime), "yyyy年M月d日（EEE）HH:mm", { locale: ja });
  }
  if (dateTime.date) {
    return format(new Date(dateTime.date), "yyyy年M月d日（EEE）", { locale: ja });
  }
  return "";
}


// 基準日（string型: "yyyy-MM-dd"）と日数を受け取って計算
export const calculateFutureDate = (from: string, offset: number ,formatString: string): string => {
  console.log("calculateFutureDate", from, offset, formatString);
  const baseDate = parseISO(from); // "2024-05-01" → Date型
  const futureDate = addDays(baseDate, offset-1); // n日後を計算
  return format(futureDate, formatString); // 表示用にフォーマット
};