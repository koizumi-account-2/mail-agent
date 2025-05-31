"use client";

import { candidateDaysSearchAtom } from "@/atoms/candidateDaysSearch";
import { Button } from "@/components/ui/button";
import { TentativeEvent } from "@/features/calendar/types";
import { MailDraft } from "@/features/threads/types";
import { createTentativeEvents } from "@/lib/actions/calendarApi";
import {
  createMailBodyOfCandidateDays,
  createMailDraft,
} from "@/lib/actions/createMail";
import { useAtomValue } from "jotai";
import { useState } from "react";

export const MailCreator = ({
  skey,
  projectId,
}: {
  skey: string;
  projectId: number;
}) => {
  const candidateInfo = useAtomValue(candidateDaysSearchAtom).find(
    (item) => item.id === skey
  );
  const [mail, setMail] = useState<string>("");
  const [threadId, setThreadId] = useState<string>("");
  if (!candidateInfo) {
    return <div>候補日情報がありません</div>;
  }

  const handleCreateMailOfCandidateDays = async () => {
    if (candidateInfo) {
      const createdMail = await createMailBodyOfCandidateDays(
        candidateInfo.candidateDays
      );
      setMail(createdMail);
    }
  };
  const handleCreateDraft = async () => {
    const mailDraft: MailDraft = {
      subject: "test",
      body: mail,
      to: "aaa.sss@sss.com",
    };
    const draftResponse = await createMailDraft(mailDraft, projectId);
    setThreadId(draftResponse.message.threadId);
    console.log(draftResponse);
  };
  const registerTentativeEvent = async (eventName: string) => {
    const tentativeEvent: TentativeEvent = {
      candidate_days: candidateInfo.candidateDays,
      thread_id: threadId ?? skey,
      project_id: projectId ?? 0,
      travel_time_minutes: 30,
      event_duration_minutes: candidateInfo.searchParams?.durationMinutes ?? 60,
      event_name: "test",
    };
    const res = await createTentativeEvents(tentativeEvent);
    console.log("registerTentativeEvent", res);
  };
  return (
    <div>
      {candidateInfo && "候補日情報があります"}
      <Button onClick={handleCreateMailOfCandidateDays}>メール文作成</Button>
      <div>{mail}</div>
      <Button onClick={handleCreateDraft}>メール作成</Button>
      <Button onClick={() => registerTentativeEvent("test")}>
        候補日を登録
      </Button>
    </div>
  );
};
