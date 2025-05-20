import { CandidateDay } from "@/features/calendar/types";
import { CandidateDaysSearchParams } from "@/features/calendar/hooks/useCandidateDaysSlot";
import { atom } from "jotai";
export type CandidateInfoAtom = {
  id: string;
  candidateDays: CandidateDay[];
  candidateDaysAll: CandidateDay[];
  searchParams: CandidateDaysSearchParams | null;
};


export const baseCandidateDaysSearchAtom = atom< CandidateInfoAtom[]>([]);

export const candidateDaysSearchAtom = atom(
    (get) => {
        return get(baseCandidateDaysSearchAtom)
    },
    (get, set, update:CandidateInfoAtom) => {
        console.log("update", update);
        const target =get(baseCandidateDaysSearchAtom).find(item => item.id === update.id)
        // 既に存在する場合は、更新する
        if(target){
            set(baseCandidateDaysSearchAtom, get(baseCandidateDaysSearchAtom).map(x => {
                if(x.id !== target.id){
                    return x;
                }else {
                    return update
                }
            }))
        }else {
            set(baseCandidateDaysSearchAtom, [...get(baseCandidateDaysSearchAtom),update]);
        }
        console.log("baseCandidateDaysSearchAtom 更新しました。", get(baseCandidateDaysSearchAtom));
    }
)