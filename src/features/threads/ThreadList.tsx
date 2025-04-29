"use client";

import { ThreadDTO } from "@/features/threads/types";
import Link from "next/link";
import { useState } from "react";
export const ThreadList = ({
  threads,
  projectId,
}: {
  threads: ThreadDTO[];
  projectId: string | undefined;
}) => {
  const [selectedThreadId, setSelectedThreadId] = useState<string>("");
  return (
    <div>
      {threads.map((thread) => (
        <div key={thread.threadId}>
          <button onClick={() => setSelectedThreadId(thread.threadId)}>
            詳細
          </button>
          <br />
          {thread.messages[0].subject}
          <br />
          {thread.messages[0].from}
          <br />
          {thread.messages[0].date}
          <hr />
        </div>
      ))}
      {selectedThreadId && (
        <div>
          <h2>詳細</h2>
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
            {
              threads.find((thread) => thread.threadId === selectedThreadId)
                ?.messages[0].content
            }
          </div>
        </div>
      )}
    </div>
  );
};
