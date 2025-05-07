import React from "react";
import { MailMessageDTO } from "../../types";
import MailMessagePresentation from "./MailMessagePresentation";

export const MessageList = ({
  mailMessages,
}: {
  mailMessages: MailMessageDTO[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {mailMessages.map((mailMessage) => (
        <MailMessagePresentation
          key={mailMessage.id}
          mailMessage={mailMessage}
        />
      ))}
    </div>
  );
};
