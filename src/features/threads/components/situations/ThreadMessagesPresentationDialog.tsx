"use client";
import React, { useState } from "react";
import { MailMessageDTO, ThreadDTO } from "../../types";
import MailMessagePresentation from "../messages/MailMessagePresentation";
import MessagesDialog from "../messages/MessagesDialog";
import { Button } from "@/components/ui/button";
//このコンポーネントから、agentによるanalyzeの呼び出しを行う
// ここから、DBへの格納も行う。
// 命名は変えた方がいい

export const ThreadMessagesPresentationDialog = ({
  projectId,
  thread,
}: {
  projectId: number;
  thread: ThreadDTO;
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
  };
  console.log(projectId);
  return (
    <div>
      <Button onClick={() => setShowDeleteDialog(true)}>詳細を確認</Button>
      {showDeleteDialog && (
        <MessagesDialog
          isOpen={showDeleteDialog}
          onOpenChange={handleDeleteDialogChange}
        >
          {thread.messages.map((message: MailMessageDTO) => (
            <MailMessagePresentation key={message.id} mailMessage={message} />
          ))}
        </MessagesDialog>
      )}
    </div>
  );
};
