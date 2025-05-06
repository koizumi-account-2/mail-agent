import { confirmModalAtom } from "@/atoms/confirmModalAtom";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

export function confirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    store.set(confirmModalAtom, {
      title: "Confirm",
      description: message,
      isOpen: true,
      resolve,
    });
  });
}