import { useMutation, useQueryClient } from "react-query";
import { CreateTarget } from "../api/branches";
import { useFormik } from "formik";
import { VAIDATION_SCHEMA_CREATE_TARGET } from "../constants/validationSchema";
import { WEEK_ORDER } from "../constants";
import { toast } from "react-toastify";

export const useTargetForm = (branches, setCurrentBranch) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((targetData) => CreateTarget(targetData), {
    onSuccess: () => {
      queryClient.invalidateQueries("targetSettings");
      toast.success(`Target set successfully!`);
      formik.resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to set target: ${error.message}`);
    },
  });

  // Helper function to format target data for API
  const formatTargetData = (branch) => {
    return {
      branchID: branch.branchID,
      branchName: branch.branchName,
      weekTargets: Object.keys(branch.weekTargets).map((day) => ({
        dayName: day,
        TargetAmount: branch.weekTargets[day].target
          ? Number(parseFloat(branch.weekTargets[day].target).toFixed(2))
          : null,
        MinTargetAmount: branch.weekTargets[day].minTarget
          ? Number(parseFloat(branch.weekTargets[day].minTarget).toFixed(2))
          : null,
      })),
    };
  };

  const formik = useFormik({
    initialValues: {
      branch: "",
      minTarget: "",
      maxTarget: "",
    },
    validationSchema: VAIDATION_SCHEMA_CREATE_TARGET,
    onSubmit: (values) => {
      const branch = branches.find((item) => item.branchName === values.branch);

      // Find first day without targets
      const firstEmptyDay = WEEK_ORDER.find(
        (day) =>
          !branch.weekTargets[day]?.minTarget ||
          !branch.weekTargets[day]?.target
      );

      if (firstEmptyDay) {
        // Update branch with new target values
        const updatedTargetSettings = branches.map((item) =>
          item.branchName === values.branch
            ? {
                ...item,
                weekTargets: {
                  ...item.weekTargets,
                  [firstEmptyDay]: {
                    minTarget: values.minTarget,
                    target: values.maxTarget,
                  },
                },
              }
            : item
        );

        const updatedBranch = updatedTargetSettings.find(
          (item) => item.BranchID === branch.BranchID
        );

        // Format and submit data
        const targetData = formatTargetData(updatedBranch);
        mutation.mutate(targetData);
      } else {
        toast.info("All days already have targets set!");
      }
    },
  });

  const handleBranchChange = (e) => {
    formik.handleChange(e);
    setCurrentBranch(e.target.value);
  };

  return {
    formik,
    handleBranchChange,
    isSubmitting: mutation.isLoading,
  };
};
