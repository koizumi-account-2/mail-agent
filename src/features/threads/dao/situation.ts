"use server";

import { prisma } from "@/lib/prisma";
import { ThreadSituation } from "../types";
import { cache } from "react";


// situationを作成
export async function insertThreadSituation( threadSituation: ThreadSituation) {
  const paramThreadSituation={
    projectId:threadSituation.projectId,
    threadId:threadSituation.threadId,
    status:threadSituation.status,
    latestMessageId:threadSituation.latestMessageId,
    notes:threadSituation.notes
  }

  const situation = await prisma.situation.create({
    data: paramThreadSituation,
  });
  return situation;
}

export const getThreadSituation = cache(
  async (
    projectId: number,
    threadId: string
  ): Promise<ThreadSituation> => {
  const threadSituation = await prisma.situation.findFirst({
    where: {
      projectId: projectId,
      threadId: threadId,
    },
    include: {
      project: true,
      thread: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });



  if (!threadSituation) {
    return {
      projectId: projectId,
      threadId: threadId,
      status: "",
      latestMessageId: "",
      notes: "",
    };
  }
  return {
    ...threadSituation,
    notes: threadSituation.notes ?? "",
  }
  }
);

export async function getAllSituations() {
  const situations = await prisma.situation.findMany();
  return situations;
}

export async function getSituationById(id: number) {
  const situation = await prisma.situation.findUnique({
    where: { id: id },
  });
  return situation;
}
