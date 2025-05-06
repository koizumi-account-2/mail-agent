"use client";
import React from "react";
import { MailMessageDTO } from "../../types";

export default function MailMessagePresentation({
  mailMessage,
}: {
  mailMessage: MailMessageDTO;
}) {
  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200 space-y-4">
      <div className="text-sm text-gray-500">ID: {mailMessage.id}</div>

      <h2 className="text-xl font-semibold text-gray-800">
        {mailMessage.subject}
      </h2>

      <div className="text-sm text-gray-600">
        <div>
          <span className="font-medium">From:</span> {mailMessage.sender}
        </div>
        <div>
          <span className="font-medium">Date:</span> {mailMessage.date}
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 text-sm text-gray-800 whitespace-pre-line">
        {mailMessage.content}
      </div>
    </div>
  );
}
