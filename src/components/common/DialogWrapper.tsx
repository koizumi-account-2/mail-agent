import { DialogHeader, DialogTitle, DialogContent, Dialog } from "../ui/dialog";

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
};

export default function DialogWrapper({
  children,
  isOpen,
  onOpenChange,
  title,
}: DialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
