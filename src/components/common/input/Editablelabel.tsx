"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
type EditableLabelProps = {
  id: string;
  name: string;
  value: string;
  presentation: (value: string) => React.ReactNode;
  onSave: (newValue: string) => void;
  minRows?: number;
};

export default function EditableLabel({
  id,
  name,
  value,
  presentation,
  onSave,
  minRows = 1,
}: EditableLabelProps) {
  const [editing, setEditing] = useState(false);

  const saveValue = (newValue: string) => {
    onSave(newValue);
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div
        onDoubleClick={() => {
          console.log("onDoubleClick");
          setEditing(true);
        }}
      >
        {presentation(value)}
      </div>
      {editing ? (
        <EditTextDialog
          isOpen={editing}
          onOpenChange={setEditing}
          id={id}
          name={name}
          value={value}
          minRows={minRows}
          reflectValue={saveValue}
        />
      ) : (
        <>
          <Button onClick={() => setEditing(true)} variant="outline">
            編集
          </Button>
        </>
      )}
    </div>
  );
}
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type EditTextDialogProps = {
  id: string;
  name: string;
  value: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  minRows: number;
  reflectValue: (value: string) => void;
  placeholder?: string;
};

function EditTextDialog({
  isOpen,
  onOpenChange,
  minRows = 8,
  value,
  reflectValue,
  id,
  placeholder,
}: EditTextDialogProps) {
  const [inputValue, setInputValue] = useState(value);
  const handleSave = () => {
    reflectValue(inputValue);
    onOpenChange(false);
  };
  const handleCancel = () => {
    onOpenChange(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>スレッド内のメッセージ</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh]">
          <TextareaAutosize
            id={id}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full border p-2"
            minRows={minRows}
            placeholder={placeholder}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>保存</Button>
          <Button onClick={handleCancel}>キャンセル</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
