"use client";
import React, { useActionState } from "react";
import { ThreadDTO } from "../../types";
import { CustomeCard } from "@/components/common/CustomeCard";
import { ThreadInfoFormInputs } from "@/validations/threadInfoValidation";
import { Form } from "@/components/ui/form";

import { TextBoxField } from "@/components/formitem/TextBoxField";
import { TextareaField } from "@/components/formitem/TextareaField";
import { useThreadInfoForm } from "../../hooks/useThreadInfoFormHook";
import { updateThreadSituation } from "../../actions/situationActions";

export const ThreadInfoEditCard = ({
  thread,
  projectId,
}: {
  thread: ThreadDTO;
  projectId: number;
}) => {
  const { form } = useThreadInfoForm({
    threadName: thread.subject ?? "",
    locationName: thread.locationName,
    locationAddress: thread.locationAddress,
  });
  const [, formAction, isPending] = useActionState(updateThreadSituation, {
    success: false,
    errors: {},
  });
  const onSubmit = (data: ThreadInfoFormInputs) => {
    console.log(data);
  };
  return (
    <CustomeCard title="スレッド情報" description="">
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <div className="flex flex-col gap-4">
            <input type="hidden" name="threadSituationId" value={thread.id} />
            <input type="hidden" name="projectId" value={projectId} />
            <TextBoxField
              form={form}
              fieldName="threadName"
              label="スレッド名"
              placeholder="例: スレッド名"
              type="text"
              textClassName="w-full"
            />
            <TextBoxField
              form={form}
              fieldName="locationName"
              label="相手の会社名"
              placeholder="例: 相手の会社名"
              textClassName="w-full"
            />
            <TextBoxField
              form={form}
              fieldName="locationAddress"
              label="相手の会社住所"
              placeholder="例: 相手の会社住所"
              textClassName="w-full"
            />
          </div>
        </form>
      </Form>
    </CustomeCard>
  );
};
