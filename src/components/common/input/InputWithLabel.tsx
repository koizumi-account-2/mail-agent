import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  type: string;
  id: string;
}
export function InputWithLabel({ label, id, ...props }: InputWithLabelProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input {...props} />
    </div>
  );
}
