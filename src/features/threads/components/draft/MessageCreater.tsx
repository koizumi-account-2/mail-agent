"use client";
import { createMail } from "@/lib/actions/createMail";
import { CandidateDay } from "@/features/calendar/types";
import React, { useCallback, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { CandidateDayView } from "@/features/calendar/components/CandidateDayView";
import { HeaderGroupS } from "@/components/common/header/HeaderGroups";
import { localStorageUtil } from "@/utils/localStorage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type localStorageCandidateDays = {
  candidateDays: CandidateDay[];
  threadId: string;
};
type MessageCreater = {
  storageKey: string;
  mode: "candidate" | "draft";
};

export const MessageCreater = ({
  storageKey,
  mode = "candidate",
}: MessageCreater) => {
  console.log("key", storageKey);
  const [candidateDays, setCandidateDays] =
    useState<localStorageCandidateDays | null>(null);
  const [mail, setMail] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const { getValue } = localStorageUtil<localStorageCandidateDays>(true);
    const candidateDaysLocalStorage = getValue(storageKey);
    console.log("candidateDaysLocalStorage", candidateDaysLocalStorage);
    if (candidateDaysLocalStorage) {
      setCandidateDays(candidateDaysLocalStorage);
    }
  }, [storageKey]);
  const handleEditCandidateDays = () => {
    router.push(
      `/calendar/register?skey=${storageKey}&threadId=${candidateDays?.threadId}`
    );
  };
  const handleCreateMail = async () => {
    if (candidateDays?.candidateDays) {
      const res = await createMail(candidateDays.candidateDays);
      console.log("createMail", res);
      setMail(res);
    }
  };
  return (
    <>
      <HeaderGroupS
        headerTitle="候補日"
        headerDescription="以下の候補日を元にメールを作成します"
      />

      <Button onClick={handleEditCandidateDays}>候補日を編集する</Button>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] auto-rows-min gap-4 overflow-y-auto">
        {candidateDays?.candidateDays.map((day) => (
          <CandidateDayView
            key={day.date}
            candidateDay={day}
            isShowOnly={true}
            contentHeight="h-[100px]"
          />
        ))}
      </div>

      <HeaderGroupS
        headerTitle="追加要望"
        headerDescription="追加要望を入力してください"
      />
      <div className="flex-1">
        <TextareaAutosize
          minRows={4}
          className="w-full rounded-md border-2 border-gray-300 p-2"
          placeholder="追加要望を入力してください"
        />
      </div>
      <p>{mail}</p>
      <Button onClick={handleCreateMail}>メールを作成する</Button>
    </>
  );
};
