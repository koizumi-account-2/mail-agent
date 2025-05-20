"use client";
import React from "react";
import { useUpdateMailThreadSituation } from "../../hooks/useUpdateMailThreadSituation";
import { ThreadSituation } from "../../types";
import { Button } from "@/components/ui/button";

export const ThreadSituationUpdater = ({
  threadSituation,
  projectId,
}: {
  threadSituation: ThreadSituation;
  projectId: number;
}) => {
  const { updateSituation, isLoading, statusMessage } =
    useUpdateMailThreadSituation();
  const clickHandler = async () => {
    await updateSituation({ threadSituation, projectId });
  };
  return (
    <Button onClick={clickHandler}>
      {isLoading ? (statusMessage ? statusMessage : "更新中...") : "更新"}
    </Button>
  );
};
