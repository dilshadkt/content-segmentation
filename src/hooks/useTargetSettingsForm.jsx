import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { VALIDATION_SCHEMA } from "../constants/validationSchema";
import { CreateTarget } from "../api/branches";

export const useTargetSettingsForm = (selectedBranch, onSuccess) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((targetData) => CreateTarget(targetData), {
    onSuccess: () => {
      queryClient.invalidateQueries("targetSettings");
      toast.success(`Target set successfully!`);
      formik.resetForm();
      onSuccess();
    },
    onError: (error) => {
      toast.error(`Failed to set target: ${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      selectedDays: [],
      minTarget: "",
      maxTarget: "",
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: (values) => {
      // Transform form values to API format
      const updatedTargets = { ...selectedBranch.weekTargets };

      // Update targets for selected days
      values.selectedDays.forEach((day) => {
        updatedTargets[day] = {
          minTarget: values.minTarget,
          target: values.maxTarget,
        };
      });

      // Format data for API
      const targetData = { ...selectedBranch };
      targetData.weekTargets = Object.keys(updatedTargets).map((day) => ({
        dayName: day,
        TargetAmount: updatedTargets?.[day].target
          ? Number(parseFloat(updatedTargets?.[day].target).toFixed(2))
          : null,
        MinTargetAmount: updatedTargets?.[day].minTarget
          ? Number(parseFloat(updatedTargets?.[day].minTarget).toFixed(2))
          : null,
      }));

      mutation.mutate(targetData);
    },
  });

  // Helper for checkbox handling
  const handleCheckboxChange = (dayName) => {
    const selectedDays = formik.values.selectedDays.includes(dayName)
      ? formik.values.selectedDays.filter((d) => d !== dayName)
      : [...formik.values.selectedDays, dayName];
    formik.setFieldValue("selectedDays", selectedDays);
  };

  // Helper for selecting/deselecting all days
  const handleSelectAllDays = (allDays) => {
    const isAllSelected = formik.values.selectedDays.length === allDays.length;
    formik.setFieldValue("selectedDays", isAllSelected ? [] : allDays);
  };

  return {
    formik,
    handleCheckboxChange,
    handleSelectAllDays,
    isSubmitting: mutation.isLoading,
  };
};
