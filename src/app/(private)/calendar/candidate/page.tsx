import React from "react";
import { CalendarCandidateSearchForm } from "@/features/calendar/components/CalendarCandidateSearchForm";
type SearchParams = {
  from: string;
  skey?: string;
  projectId?: string;
  threadId?: string;
};
export default async function CandidatePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const skey = resolvedSearchParams.skey;
  const projectId = resolvedSearchParams.projectId;
  const threadId = resolvedSearchParams.threadId;
  const from = resolvedSearchParams.from;
  return (
    <div className="container mx-auto px-4 py-4">
      <CalendarCandidateSearchForm
        skey={skey}
        projectId={projectId}
        threadId={threadId}
        from={from}
      />
    </div>
  );
}
