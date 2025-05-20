import React from "react";
import { FormControl } from "../ui/form";
import { FormLabel } from "../ui/form";
import { FormItem } from "../ui/form";
import { FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

interface DummyFieldProps {
  isPending?: boolean;
  pendingText?: string;
  showText: string;
  label: string;
  unit?: string;
}

export const DummyField = ({
  isPending = false,
  pendingText = "",
  showText,
  label,
  unit,
}: DummyFieldProps) => {
  return (
    <FormItem className="flex flex-col justify-start h-[80px] w-full">
      <FormLabel className="text-muted-foreground">{label}</FormLabel>
      <div className="flex items-center gap-2">
        <FormControl>
          <div
            className={cn(
              "flex items-center gap-2 h-10 px-3 py-2 rounded-md text-sm",
              "border-2 border-blue-400 bg-blue-50 text-blue-800 font-medium"
            )}
          >
            {isPending ? pendingText : showText}
          </div>
        </FormControl>
        {unit && <span className="text-sm">{unit}</span>}
      </div>
      <FormMessage className="min-h-[1.25rem]" />
    </FormItem>
  );
};
