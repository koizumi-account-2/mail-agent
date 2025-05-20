"use server";

import { prisma } from "@/lib/prisma";
import { ThreadSituation } from "../types";


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

export async function getThreadSituation(
  projectId: number,
  threadId: string
): Promise<ThreadSituation> {
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
  console.log("threadSituation", threadSituation);



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
    thread: {
      ...threadSituation.thread,
      messages: [],
      threadId: threadSituation.threadId,
    },
    notes: threadSituation.notes ?? "",
  }
}

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
