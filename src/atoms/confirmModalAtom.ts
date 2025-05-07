import { TConfirmModal } from "@/types/common";
import { atom } from "jotai";

export const confirmModalAtom = atom<TConfirmModal>({
  title: "",
  isOpen: false,
  description: "",
  resolve: () => {},
});
