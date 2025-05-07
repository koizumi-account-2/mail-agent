import { EventTime } from "@/features/calendar/types";
import { ja } from "date-fns/locale";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

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
