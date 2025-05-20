

import { useForm } from "react-hook-form";
import {
  resolver,
  ThreadSituationFormInputs,
} from "@/validations/threadSituationValidation";

export const useThreadSituationForm = (defaultValues: ThreadSituationFormInputs) => {
  const form = useForm<ThreadSituationFormInputs>({
    mode: "onTouched",
    resolver,
    defaultValues,
  });

  return { form };
};
