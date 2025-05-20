"use client";
import React, { useActionState } from "react";
import { CustomeCard } from "@/components/common/CustomeCard";
import { Form } from "@/components/ui/form";
import { TextareaField } from "@/components/formitem/TextareaField";
import { updateThreadSituation } from "../../actions/situationActions";
import { useThreadSituationForm } from "../../hooks/useThreadSituationFormHook";
import { MailThreadDTO, ThreadSituation } from "../../types";
import { ThreadSituationFormInputs } from "@/validations/threadSituationValidation";
import { Button } from "@/components/ui/button";

export const ThreadSituationEditCard = ({
  threadSituation,
  mailThread,
}: {
  threadSituation: ThreadSituation;
  mailThread: MailThreadDTO;
}) => {
  const { form } = useThreadSituationForm({
    notes: threadSituation.notes ?? "",
  });
  const [, formAction, isPending] = useActionState(updateThreadSituation, {
    success: false,
    errors: {},
  });
  const onSubmit = (data: ThreadSituationFormInputs) => {
    console.log(data);
  };

  return (
    <CustomeCard title="スレッド情報" description="">
      <Form {...form}>
        <form action={formAction} className="space-y-8">
          <div className="flex flex-col gap-4">
            <input
              type="hidden"
              name="threadSituationId"
              value={threadSituation.id}
            />
            <TextareaField
              form={form}
              fieldName="notes"
              label="メモ"
              placeholder="例: メモ"
              textClassName="w-full"
            />
          </div>
          <Button
            type="submit"
            disabled={
              isPending || !form.formState.isValid || !form.formState.isDirty
            }
          >
            更新
          </Button>
        </form>
      </Form>
    </CustomeCard>
  );
};
