
"use server";

import { prisma } from "@/lib/prisma";
import { ThreadDTO } from "../types";

// スレッドの相手を更新
export async function getThreadById(threadId: string,projectId:number): Promise<ThreadDTO> {
    const thread = await prisma.thread.findUnique({
        where: { id: threadId,projectId:projectId },
    });
    return {
        id: threadId,
        locationName: thread?.locationName ?? "",
        locationAddress: thread?.locationAddress ?? "",
    };
}
