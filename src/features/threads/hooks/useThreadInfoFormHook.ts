

import { useForm } from "react-hook-form";
import {
  resolver,
  ThreadInfoFormInputs,
} from "@/validations/threadInfoValidation";

export const useThreadInfoForm = (defaultValues: ThreadInfoFormInputs) => {
  const form = useForm<ThreadInfoFormInputs>({
    mode: "onTouched",
    resolver,
    defaultValues,
  });

  return { form };
};
