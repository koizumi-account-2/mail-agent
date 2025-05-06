"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type MessagesDialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MessagesDialog({
  children,
  isOpen,
  onOpenChange,
}: MessagesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>スレッド内のメッセージ</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
