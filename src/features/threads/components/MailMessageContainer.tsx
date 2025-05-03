"use client";
import React from "react";
import { MailMessageDTO } from "../types";

export default function MailMessageContainer({
  mailMessage,
}: {
  mailMessage: MailMessageDTO;
}) {
  return (
    <div
      key={mailMessage.id}
      className="border-2 border-gray-300 rounded-md p-2"
    >
      <div>id:{mailMessage.id}</div>
      <div>subject:{mailMessage.subject}</div>
      <div>from:{mailMessage.sender}</div>
      <div>date:{mailMessage.date}</div>
      <div>content:{mailMessage.content}</div>
    </div>
  );
}
