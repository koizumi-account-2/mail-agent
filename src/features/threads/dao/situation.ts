"use server";

import { prisma } from "@/lib/prisma";
import { ThreadSituation } from "../types";

// タスクを作成
export async function insertThreadSituation( threadSituation: ThreadSituation) {
  const paramThreadSituation={
    projectId:threadSituation.projectId,
    threadId:threadSituation.threadId,
    status:threadSituation.status,
    latestMessageId:threadSituation.latestMessageId,
    notes:threadSituation.notes
  }
  console.log("paramThreadSituation", paramThreadSituation);
  const task = await prisma.situation.create({
    data: paramThreadSituation,
  });
  return task;
}
export async function getThreadSituation(projectId: number, threadId: string) {
  const threadSituation = await prisma.situation.findFirst({
    where: {
      projectId: projectId,
      threadId: threadId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return threadSituation;
}

export async function getAllSituations() {
  const situations = await prisma.situation.findMany();
  return situations;
}
