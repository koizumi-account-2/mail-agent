"use server";
import { CalendarEventCreater } from "@/features/calendar/components/CalendarEventCreater";
type Params = {
  skey: string;
};
export default async function CalendarCreatePage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { skey } = await searchParams;

  console.log("key", skey);
  return <CalendarEventCreater skey={skey} mode="candidate" />;
}
