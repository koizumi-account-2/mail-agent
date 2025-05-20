import React from "react";
import { CalendarCandidateSearchForm } from "@/features/calendar/components/CalendarCandidateSearchForm";
type SearchParams = {
  skey?: string;
};
export default async function CandidatePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const skey = resolvedSearchParams.skey;
  return (
    <div className="container mx-auto px-4 py-4">
      <CalendarCandidateSearchForm skey={skey} />
    </div>
  );
}
