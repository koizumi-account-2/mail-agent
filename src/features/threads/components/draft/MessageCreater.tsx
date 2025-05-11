"use client";
import { createMail } from "@/lib/actions/createMail";
import { CandidateDay } from "@/features/calendar/types";
import React, { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
type localStorageCandidateDays = {
  candidateDays: CandidateDay[];
  threadId: string;
};

export const MessageCreater = () => {
  const [candidateDays, setCandidateDays] = useState<CandidateDay[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem("CANDIDATE_DAYS");
      let parsedData: localStorageCandidateDays | null = null;
      if (data) {
        parsedData = JSON.parse(data);
      }
      if (parsedData) {
        setCandidateDays(parsedData.candidateDays);
      }
    };
    fetchData();
    return () => {
      console.log("unmount");
      localStorage.removeItem("CANDIDATE_DAYS");
    };
  }, []);
  return (
    <>
      <p>以下の候補日を元にメールを作成します</p>
      {candidateDays.map((candidateDay) => (
        <p key={candidateDay.date}>{candidateDay.date}</p>
      ))}
    </>
  );
};
