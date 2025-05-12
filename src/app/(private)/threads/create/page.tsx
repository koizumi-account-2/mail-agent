"use server";
import { MessageCreater } from "@/features/threads/components/draft/MessageCreater";
type Params = {
  skey: string;
};
export default async function ThreadCreatePage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { skey } = await searchParams;

  console.log("key", skey);
  return <MessageCreater storageKey={skey} mode="candidate" />;
}
