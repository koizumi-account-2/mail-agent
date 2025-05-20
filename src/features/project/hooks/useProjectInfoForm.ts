

import { useForm } from "react-hook-form";
import {
  resolver,
  ProjectInfoFormInputs,
} from "@/validations/projectInfoValidation";

export const useProjectInfoForm = (defaultValues: ProjectInfoFormInputs) => {
  const form = useForm<ProjectInfoFormInputs>({
    mode: "onTouched",
    resolver,
    defaultValues,
  });




  return { form };
};
