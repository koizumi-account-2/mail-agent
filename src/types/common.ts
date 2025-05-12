import { CandidateDay } from "@/features/calendar/types";

export type TConfirmModal = {
  title: string;
  isOpen: boolean;
  description: string;
  execLabel?: string;
  cancelLabel?: string;
  resolve: (result: boolean) => void;
};

export type localStorageCandidateDays = {
  candidateDays: CandidateDay[];
  threadId: string;
};
