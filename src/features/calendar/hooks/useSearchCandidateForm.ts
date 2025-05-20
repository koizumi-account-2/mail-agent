
import { useForm } from "react-hook-form";
import {
  resolver,
  CandidateFormInputs,
} from "@/validations/calendarValidate";
import { calculateFutureDate } from "@/lib/utils";
import { useState } from "react";

export const useSearchCandidateForm = (defaultValues: CandidateFormInputs) => {
  const form = useForm<CandidateFormInputs>({
    mode: "onTouched",
    resolver,
    defaultValues,
  });

  const [eventTime, setEventTime] = useState(
    defaultValues.travelTimeMinutes + defaultValues.durationMinutes
  );
  const [endDate, setEndDate] = useState(
    calculateFutureDate(defaultValues.from, defaultValues.span, "yyyy/MM/dd")
  );
  const calcTravelTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const name = e.target.name;
    if (value === "") {
      value = "0";
    }

    if (name === "travelTimeMinutes") {
      setEventTime(
        parseInt(value) + parseInt(form.getValues("durationMinutes").toString())
      );
    } else if (name === "durationMinutes") {
      setEventTime(
        parseInt(value) +
          parseInt(form.getValues("travelTimeMinutes").toString())
      );
    }
  };
  const calcEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "from") {
      if (value === "") {
        setEndDate("");
      } else {
        setEndDate(
          calculateFutureDate(
            value,
            parseInt(form.getValues("span").toString()),
            "yyyy/MM/dd"
          )
        );
      }
    } else if (name === "span") {
      if (value === "") {
        setEndDate("");
      } else {
        setEndDate(
          calculateFutureDate(
            form.getValues("from"),
            parseInt(value),
            "yyyy/MM/dd"
          )
        );
      }
    }
  };



  return { form, eventTime, endDate, calcTravelTime, calcEndDate };
};
