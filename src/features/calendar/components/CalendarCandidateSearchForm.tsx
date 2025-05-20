"use client";

import { AppTab, TabItem } from "@/components/common/AppTab";
import { CandidateSearchCard } from "./CandidateSearchCard";
import { TabCandidate } from "./tabContent/TabCandidate";

import {
  CandidateDaysSearchParams,
  useCandidateDaysSlot,
} from "../hooks/useCandidateDaysSlot";
import { useCallback, useState } from "react";
import { confirm } from "@/utils/confirm";
import {
  CandidateFormInputs,
  defaultValues,
} from "@/validations/calendarValidate";
import {
  candidateDaysSearchAtom,
  CandidateInfoAtom,
} from "@/atoms/candidateDaysSearch";
import { useAtomValue, useSetAtom } from "jotai";
import { useSearchCandidateForm } from "../hooks/useSearchCandidateForm";
import { useWatch } from "react-hook-form";
const defaultTab = "1";
export const CalendarCandidateSearchForm = ({ skey }: { skey?: string }) => {
  const [editingSkey, setEditingSkey] = useState<string>(skey || "");
  const [selectedTab, setSelectedTab] = useState<string>(defaultTab);
  console.log("rendered", skey, editingSkey);

  // atomから候補日情報をを取得
  const candidateInfo = useAtomValue(candidateDaysSearchAtom).find(
    (item) => item.id === editingSkey
  );
  // 候補日検索フォームのフォームを作成
  const { form, eventTime, endDate, calcTravelTime, calcEndDate } =
    useSearchCandidateForm(
      candidateInfo?.searchParams
        ? {
            ...defaultValues,
            ...candidateInfo.searchParams,
          }
        : defaultValues
    );
  const maxCandidatesPerDay = useWatch({
    control: form.control,
    name: "maxCandidatesPerDay",
  });

  const saveCandidateInfo = useSetAtom(candidateDaysSearchAtom);

  const {
    candidateDaysAll,
    selectedCandidateDays,
    selectEventSlot,
    search,
    statusMessage,
  } = useCandidateDaysSlot(
    candidateInfo?.candidateDays ?? [],
    candidateInfo?.candidateDaysAll ?? []
  );

  const seachCandidateDays = useCallback(
    async (searchParams: CandidateDaysSearchParams) => {
      const confirmed = await confirm("検索を実行しますか？");
      if (confirmed) {
        try {
          const newSkey = crypto.randomUUID();
          setEditingSkey(newSkey);
          const candidateDaysResult = await search(searchParams);

          if (candidateDaysResult) {
            const saveValue: CandidateInfoAtom = {
              id: newSkey,
              candidateDays: candidateDaysResult.candidate_days,
              candidateDaysAll: candidateDaysResult.candidate_days_all,
              searchParams: searchParams,
            };
            // 候補日情報を状態として一時保存
            saveCandidateInfo(saveValue);
            // 候補日情報を表示するタブに遷移
            setSelectedTab("2");
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    [editingSkey, search, setEditingSkey, saveCandidateInfo, setSelectedTab]
  );
  const tabItems: TabItem[] = [
    {
      title: "候補日検索",
      value: "1",

      content: () => (
        <CandidateSearchCard
          search={seachCandidateDays}
          statusMessage={statusMessage}
          defaultValues={defaultValues}
          form={form}
          eventTime={eventTime}
          endDate={endDate}
          calcTravelTime={calcTravelTime}
          calcEndDate={calcEndDate}
          maxCandidatesPerDay={maxCandidatesPerDay}
        />
      ),
    },

    {
      title: "候補日",
      value: "2",
      isDisabled: candidateDaysAll.length == 0,
      content: () => (
        <TabCandidate
          selectedCandidateDays={selectedCandidateDays}
          selectEventSlot={selectEventSlot}
          candidateDaysAll={candidateDaysAll}
          skey={editingSkey}
        />
      ),
    },
  ];
  return (
    <>
      <AppTab
        defaultTab="1"
        items={tabItems}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};
