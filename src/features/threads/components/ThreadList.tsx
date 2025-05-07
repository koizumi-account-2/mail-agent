"use client";

import { ThreadDTO } from "@/features/threads/types";
import Link from "next/link";
import { useState } from "react";
import { MessageList } from "./messages/MessageList";
// どうしてproject_idを渡すのか？ -> importするときに、projectIdを渡すため
export const ThreadList = ({
  threads,
  projectId,
}: {
  threads: ThreadDTO[];
  projectId: string | undefined;
}) => {
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2  p-4">
        {threads.map((thread) => (
          <div key={thread.threadId}>
            <button onClick={() => setSelectedThreadId(thread.threadId)}>
              詳細
            </button>
            <br />
            {thread.messages[0].subject}
            <br />
            {thread.messages[0].sender}
            <br />
            {thread.messages[0].date}
            <hr />
          </div>
        ))}
      </div>
      <div className="w-1/2 bg-green-100 p-4">
        {selectedThreadId && (
          <div>
            <Link
              href={
                projectId
                  ? `/project/import?id=${selectedThreadId}&projectId=${projectId}`
                  : `/project/import?id=${selectedThreadId}`
              }
            >
              <button>インポート</button>
            </Link>
            <div>
              <MessageList
                mailMessages={
                  threads.find((thread) => thread.threadId === selectedThreadId)
                    ?.messages ?? []
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
