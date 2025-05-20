import React from "react";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl } from "../ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { FormField, FormLabel, FormItem, FormMessage } from "../ui/form";

export const TextareaField = <T extends FieldValues>({
  form,
  fieldName,
  label,
  placeholder,

  onChange,
  minRows = 4,
}: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
  label: string;
  placeholder: string;
  textClassName?: string;
  minRows?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start">
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <TextareaAutosize
              id={fieldName}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              className="w-full border p-2"
              minRows={minRows}
              placeholder={placeholder}
            />
          </FormControl>

          <FormMessage className="min-h-[1.25rem]" />
        </FormItem>
      )}
    />
  );
};
