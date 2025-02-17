import * as Yup from "yup";
export const VALIDATION_SCHEMA = Yup.object().shape({
  selectedDays: Yup.array()
    .min(1, "Please select at least one day.")
    .required("You must select at least one day."),
  minTarget: Yup.number()
    .required("Min Target is required.")
    .typeError("Min Target must be a number.")
    .positive("Min Target must be positive.")
    .lessThan(Yup.ref("maxTarget"), "Min Target must be less than Max Target."),
  maxTarget: Yup.number()
    .required("Max Target is required.")
    .typeError("Max Target must be a number.")
    .positive("Max Target must be positive.")
    .moreThan(
      Yup.ref("minTarget"),
      "Max Target must be greater than Min Target."
    ),
});

export const VAIDATION_SCHEMA_CREATE_TARGET = Yup.object({
  branch: Yup.string().required("Please select a branch."),
  minTarget: Yup.number()
    .required("Minimum target is required.")
    .positive("Value must be positive.")
    .integer("Value must be an integer."),
  maxTarget: Yup.number()
    .required("Maximum target is required.")
    .positive("Value must be positive.")
    .integer("Value must be an integer.")
    .moreThan(
      Yup.ref("minTarget"),
      "Maximum target must be greater than minimum target."
    ),
});
