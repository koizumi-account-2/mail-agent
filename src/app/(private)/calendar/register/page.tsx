import { CalendarRegisterForm } from "@/features/calendar/components/CalendarRegisterForm";
type SearchParams = {
  name?: string;
  address?: string;
};
export default async function CalendarRegisterPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <CalendarRegisterForm
      name={resolvedSearchParams.name}
      address={resolvedSearchParams.address}
    />
  );
}
