"use client";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { CandidateFormInputs } from "@/validations/calendarValidate";
import { TextBoxField } from "@/components/formitem/TextBoxField";
import { DateField } from "@/components/formitem/DateField";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { CustomArea } from "@/components/area/CustomArea";
import { DummyField } from "@/components/formitem/DummyField";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { CandidateDaysSearchParams } from "../hooks/useCandidateDaysSlot";
import { useSearchCandidateForm } from "../hooks/useSearchCandidateForm";
import { ChangeEvent } from "react";
export const CandidateSearchCard = ({
  search,
  statusMessage,
  defaultValues,
  form,
  eventTime,
  endDate,
  calcTravelTime,
  calcEndDate,
  maxCandidatesPerDay,
}: {
  search: (searchParams: CandidateDaysSearchParams) => Promise<void>;
  statusMessage: string;
  defaultValues: CandidateFormInputs;
  form: UseFormReturn<CandidateFormInputs>;
  eventTime: number;
  endDate: string;
  calcTravelTime: (e: ChangeEvent<HTMLInputElement>) => void;
  calcEndDate: (e: ChangeEvent<HTMLInputElement>) => void;
  maxCandidatesPerDay: number;
}) => {
  const onSubmit = async (data: CandidateFormInputs) => {
    await search({ ...data, eventName: "test" });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>候補日を検索</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DateField
                form={form}
                fieldName="from"
                label="開始日"
                onChange={calcEndDate}
              />
              <TextBoxField
                form={form}
                fieldName="span"
                label="検索期間"
                placeholder="例: 2"
                type="number"
                unit="日"
                onChange={calcEndDate}
                step={1}
              />
              <div className="w-30">
                <DummyField
                  pendingText="Loading..."
                  showText={endDate}
                  label="終了日"
                />
              </div>

              <TextBoxField
                form={form}
                fieldName="travelTimeMinutes"
                label="移動時間"
                placeholder="例: 30"
                type="number"
                unit="分"
                onChange={calcTravelTime}
              />
              <TextBoxField
                form={form}
                fieldName="durationMinutes"
                label="イベント時間"
                placeholder="例: 60"
                type="number"
                unit="分"
                onChange={calcTravelTime}
              />
              <div className="w-20">
                <DummyField
                  pendingText="Loading..."
                  showText={eventTime.toString()}
                  label="合計時間"
                  unit="分"
                />
              </div>
            </div>
            <TextBoxField
              form={form}
              fieldName="maxCandidatesPerDay"
              label="最大候補日数"
              placeholder="例: 3"
              type="number"
              unit="日"
              step={1}
            />
            <CustomArea>
              <div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    {format(form.getValues("from"), "yyyy/MM/dd")}から
                    {endDate}までの{form.getValues("span")}日間を検索します。
                  </li>
                  <li>
                    {eventTime}分間のイベントを予約可能な時間帯を検索します。
                  </li>
                  <li>
                    １日あたり最大{maxCandidatesPerDay}件の候補日を表示します。
                  </li>
                </ul>
              </div>
            </CustomArea>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={!!statusMessage}
              >
                {statusMessage || "候補日を検索"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
