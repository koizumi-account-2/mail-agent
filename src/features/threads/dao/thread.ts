
"use server";

import { prisma } from "@/lib/prisma";
import { ContactDTO } from "../types";
import { Contact } from "@prisma/client";
// スレッドの相手を更新
export async function updateThreadContact( threadId: string,contact:ContactDTO) {

    const paramContact:Contact={
        name:contact.company_name,
        address:contact.company_address
    }
    const existingThread = await prisma.thread.findUnique({
        where: { id: threadId },
        include: {
            contact: true,
        },
    });
    
    const updatedThread = await prisma.thread.update({
        where: { id: threadId },
        data: {
            contact: existingThread?.contactId ? 
            {
                update: paramContact
            }
        : {
            create: paramContact
            },
        },
    });
    return updatedThread;
}