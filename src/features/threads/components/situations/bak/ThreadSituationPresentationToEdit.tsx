"use client";
import { ThreadSituation, ThreadDTO } from "../../../types";
import { useRouter } from "next/navigation";
import { CustomeCard } from "@/components/common/CustomeCard";
import EditableLabel from "@/components/common/input/Editablelabel";
import { HeaderS } from "@/components/common/header/Headers";
import { DescriptionS } from "@/components/common/header/Descriptions";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { updateThreadSituation } from "../../../actions/situationActions";

type updateItemName = "companyName" | "companyAddress" | "notes";

export const ThreadSituationPresentationToEdit = ({
  projectId,
  threadSituation,
  thread,
}: {
  projectId: number;
  threadSituation: ThreadSituation;
  thread: ThreadDTO;
}) => {
  const router = useRouter();
  // 編集したかどうか
  const [isEdited, setIsEdited] = useState(false);

  // 会社名
  const [inputCompanyName, setInputCompanyName] = useState(
    threadSituation.thread?.locationName ?? ""
  );
  // 会社住所
  const [inputCompanyAddress, setInputCompanyAddress] = useState(
    threadSituation.thread?.locationAddress ?? ""
  );
  // メモ
  const [inputNotes, setInputNotes] = useState(threadSituation.notes ?? "");

  const [state, formAction, isPending] = useActionState(updateThreadSituation, {
    success: false,
    errors: {},
  });

  const updateCreater = (itemName: updateItemName) => (newValue: string) => {
    setIsEdited(true);
    switch (itemName) {
      case "companyName":
        setInputCompanyName(newValue);
        break;
      case "companyAddress":
        setInputCompanyAddress(newValue);
        break;
      case "notes":
        setInputNotes(newValue);
        break;
    }
  };
  if (isPending) {
    return <div>更新中...</div>;
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        {threadSituation.latestMessageId ? (
          <CustomeCard title="スレッドの状況" description="">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <EditableLabel
                  id="locationName"
                  name="locationName"
                  value={inputCompanyName}
                  presentation={(value) => <HeaderS>{value}</HeaderS>}
                  onSave={updateCreater("companyName")}
                />
                <EditableLabel
                  id="locationAddress"
                  name="locationAddress"
                  value={threadSituation?.thread?.locationAddress ?? ""}
                  presentation={(value) => <DescriptionS description={value} />}
                  onSave={updateCreater("companyAddress")}
                />
              </div>
            </div>

            <EditableLabel
              value={threadSituation.notes ?? ""}
              id="notes"
              name="notes"
              presentation={(value) => (
                <div className="text-sm p-2">
                  {value.split("。").map((note: string) => (
                    <div className="text-sm p-2" key={note}>
                      {note}
                    </div>
                  ))}
                </div>
              )}
              onSave={updateCreater("notes")}
            />
            <form className="flex flex-col gap-2" action={formAction}>
              <>
                {/* フォーム項目 */}
                <input type="hidden" name="projectId" value={projectId} />
                <input
                  type="hidden"
                  name="threadSituationId"
                  value={threadSituation.id}
                />
                <input
                  type="hidden"
                  name="companyName"
                  value={inputCompanyName}
                />
                <input
                  type="hidden"
                  name="companyAddress"
                  value={inputCompanyAddress}
                />
                <input type="hidden" name="notes" value={inputNotes} />
              </>
              <div className="flex justify-between gap-2">
                <Button type="submit" className="w-3/4" disabled={!isEdited}>
                  更新
                </Button>
                <Button
                  className="w-1/4"
                  variant={"outline"}
                  disabled={!isEdited}
                  onClick={() => {
                    setInputCompanyName(
                      threadSituation.thread?.locationName ?? ""
                    );
                    setInputCompanyAddress(
                      threadSituation.thread?.locationAddress ?? ""
                    );
                    setInputNotes(threadSituation.notes ?? "");
                    setIsEdited(false);
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </CustomeCard>
        ) : (
          <div className="gap-2">
            <p>最新のメッセージがありません</p>
          </div>
        )}
      </div>
    </>
  );
};

// {
//   threadSituation.notes?.split("。").map((note) => (
//     <div className="text-sm p-2" key={note}>
//       {note}
//     </div>
//   ));
// }
