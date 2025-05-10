"use server";

import { prisma } from "@/lib/prisma";
import { ThreadSituation } from "../types";


// situationを作成
export async function insertThreadSituation( threadSituation: ThreadSituation, {locationName,locationAddress}:{locationName:string,locationAddress:string}) {
  const paramThreadSituation={
    projectId:threadSituation.projectId,
    threadId:threadSituation.threadId,
    status:threadSituation.status,
    latestMessageId:threadSituation.latestMessageId,
    notes:threadSituation.notes
  }

  console.log("paramThreadSituation", locationName,locationAddress);


  const task = await prisma.situation.create({
    data: paramThreadSituation,
  });
  await prisma.thread.update({
    where: { id: threadSituation.threadId },
    data: {
      locationName: locationName,
      locationAddress: locationAddress,
    },
  });

  return task;
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
  // return {
  //   projectId: threadSituation.projectId,
  //   threadId: threadSituation.threadId,
  //   status: threadSituation.status,
  //   latestMessageId: threadSituation.latestMessageId,
  //   thread: {
  //     threadId: threadSituation.threadId,
  //     locationName: threadSituation.thread.locationName,
  //     locationAddress: threadSituation.thread.locationAddress,
  //     messages: [],
  //   },
  //   notes: threadSituation.notes ?? "",
  //   ...(threadSituation.updatedAt ? { updatedAt: threadSituation.updatedAt } : {}),
  // };
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
