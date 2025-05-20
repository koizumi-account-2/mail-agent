import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl } from "../ui/form";

import { FormField, FormLabel, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

export const TextBoxField = <T extends FieldValues>({
  form,
  fieldName,
  label,
  placeholder,
  type,
  unit,
  textClassName,
  onChange,
  step = 30,
}: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  textClassName?: string;
  type?: string;
  unit?: string;
  step?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start h-[80px]">
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input
                id={fieldName}
                placeholder={placeholder}
                type={type}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
                step={step}
                className={textClassName ?? "w-20"}
              />
            </FormControl>
            <span className="text-sm">{unit}</span>
          </div>
          <FormMessage className="min-h-[1.25rem]" />
        </FormItem>
      )}
    />
  );
};
