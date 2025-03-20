import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
const SetTarget = ({ branches, setWeekTargets, setCurrentBranch }) => {
  const formik = useFormik({
    initialValues: {
      branch: "",
      minTarget: "",
      maxTarget: "",
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: (values, { resetForm }) => {
      const weekOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      const branch = branches.find((item) => item.name === values.branch);
      const firstEmptyDay = weekOrder.find(
        (day) =>
          !branch.weekTargets[day]?.minTarget ||
          !branch.weekTargets[day]?.target
      );

      if (firstEmptyDay) {
        const updatedTargetSettings = branches.map((item) =>
          item.name === values.branch
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
        setWeekTargets(updatedTargetSettings);

        toast.success(`Target set for ${firstEmptyDay}!`);
        resetForm();
      } else {
        toast.info("All days already have targets set!");
      }
    },
  });

  return (
    <div>
      <h4 className="text-gray-300/85">Set Targets</h4>
      <form
        className="flex  flex-col gap-y-2 md:flex-row gap-x-3 mt-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-y-1 font-light text-gray-300/70">
          <span className="text-sm">Select Branch</span>
          <div className="relative flex flex-col">
            <select
              name="branch"
              className={`p-3 text-sm bg-black border-2 ${
                formik.errors.branch && formik.touched.branch
                  ? "border-red-500"
                  : "border-gray-800/65"
              } rounded-lg shadow-md appearance-none text-white`}
              value={formik.values.branch}
              onChange={(e) => {
                formik.handleChange(e);
                setCurrentBranch(e.target.value);
              }}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled>
                Select the branch
              </option>
              {branches.map((branch, index) => (
                <option key={index} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            {formik.touched.branch && formik.errors.branch && (
              <span className="text-red-500 text-xs">
                {formik.errors.branch}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-1 font-light text-gray-300/70">
          <span className="text-sm whitespace-nowrap">Min Target :</span>
          <input
            type="text"
            name="minTarget"
            className={`p-3 text-sm bg-black border-2 ${
              formik.errors.minTarget && formik.touched.minTarget
                ? "border-red-500"
                : "border-gray-800/65"
            } rounded-lg shadow-md`}
            value={formik.values.minTarget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.minTarget && formik.errors.minTarget && (
            <span className="text-red-500 text-xs">
              {formik.errors.minTarget}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-1 font-light text-gray-300/70">
          <span className="text-sm whitespace-nowrap">Max Target :</span>
          <input
            type="text"
            name="maxTarget"
            className={`p-3 text-sm bg-black border-2 ${
              formik.errors.maxTarget && formik.touched.maxTarget
                ? "border-red-500"
                : "border-gray-800/65"
            } rounded-lg shadow-md`}
            value={formik.values.maxTarget}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.maxTarget && formik.errors.maxTarget && (
            <span className="text-red-500 text-xs">
              {formik.errors.maxTarget}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="text-sm py-3 h-fit px-5 rounded-lg bg-gray-700 hover:scale-95
            transition-all duration-300 mt-6"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SetTarget;
