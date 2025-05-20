import React from "react";
import { FormLabel, FormField, FormItem, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { FormMessage } from "../ui/form";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export const DateField = <T extends FieldValues>({
  form,
  fieldName,
  label,
  dateClassName,
  onChange,
}: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  dateClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start h-[80px]">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              type="date"
              {...field}
              className={dateClassName ?? "w-40"}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
            />
          </FormControl>
          <FormMessage className="min-h-[1.25rem]" />
        </FormItem>
      )}
    />
  );
};
