import React from "react";
import { useTargetForm } from "../../../hooks/useTargetForm";
import CustomeInput from "../../shared/customeInput";
const SetTarget = ({ branches, setCurrentBranch }) => {
  const { formik, handleBranchChange, isSubmitting } = useTargetForm(
    branches,
    setCurrentBranch
  );
  return (
    <div>
      <h4 className="text-gray-300/85">Set Targets</h4>
      <form
        className="flex  flex-col gap-y-2 md:flex-row gap-x-3 mt-3"
        onSubmit={formik.handleSubmit}
      >
        {/* Branch Selection */}
        <BranchSelect
          value={formik.values.branch}
          onChange={handleBranchChange}
          onBlur={formik.handleBlur}
          branches={branches}
          error={formik.errors.branch}
          touched={formik.touched.branch}
        />

        <CustomeInput
          errors={formik.errors}
          touched={formik.errors}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          name={"minTarget"}
          values={formik.values}
          className={`p-3 text-sm bg-black border-2 ${
            formik.errors.minTarget && formik.touched.minTarget
              ? "border-red-500"
              : "border-gray-800/65"
          } rounded-lg shadow-md`}
          placeholder={"Minimum value"}
          title={"Min Target :"}
        />
        <CustomeInput
          errors={formik.errors}
          touched={formik.errors}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          name={"maxTarget"}
          values={formik.values}
          className={`p-3 text-sm bg-black border-2 ${
            formik.errors.maxTarget && formik.touched.maxTarget
              ? "border-red-500"
              : "border-gray-800/65"
          } rounded-lg shadow-md`}
          placeholder={"Minimum value"}
          title={"Max Target :"}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-sm py-3 h-fit px-5 rounded-lg bg-gray-700 hover:scale-95
            transition-all duration-300 mt-7"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SetTarget;

// Custom component for branch selection
const BranchSelect = ({
  value,
  onChange,
  onBlur,
  branches,
  error,
  touched,
}) => (
  <div className="flex flex-col gap-y-2 font-light text-gray-300/70">
    <span className="text-sm">Select Branch</span>
    <div className="relative flex flex-col">
      <select
        name="branch"
        className={`p-3 text-sm bg-black border-2 ${
          error && touched ? "border-red-500" : "border-gray-800/65"
        } rounded-lg shadow-md appearance-none text-white`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <option value="" disabled>
          Select the branch
        </option>
        {branches?.map((branch, index) => (
          <option key={index} value={branch.branchName}>
            {branch.branchName}
          </option>
        ))}
      </select>
      {touched && error && (
        <span className="text-red-500 font-medium text-xs mt-2">{error}</span>
      )}
    </div>
  </div>
);
