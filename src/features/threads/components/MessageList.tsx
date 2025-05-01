import React from "react";
import { MailMessageDTO } from "../types";
import MailMessageContainer from "./MailMessageContainer";

export const MessageList = ({
  mailMessages,
}: {
  mailMessages: MailMessageDTO[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      {mailMessages.map((mailMessage) => (
        <MailMessageContainer key={mailMessage.id} mailMessage={mailMessage} />
      ))}
    </div>
  );
};
