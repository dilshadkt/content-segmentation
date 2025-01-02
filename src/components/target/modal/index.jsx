import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object().shape({
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

const TargetSettingsModal = ({
  isSettingsMenuOpen,
  setWeekTargets,
  day,
  setSettingsMenuOpen,
  selectedBranch,
}) => {
  const formik = useFormik({
    initialValues: {
      selectedDays: [],
      minTarget: "",
      maxTarget: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const updatedTargets = { ...selectedBranch.weekTargets };
      values.selectedDays.forEach((day) => {
        updatedTargets[day] = {
          minTarget: values.minTarget,
          target: values.maxTarget,
        };
      });
      setWeekTargets((prevTargets) =>
        prevTargets.map((branch) =>
          branch.name === selectedBranch.name
            ? { ...branch, weekTargets: updatedTargets }
            : branch
        )
      );
      setSettingsMenuOpen(false);
      resetForm();
    },
  });

  // Handle checkbox change
  const handleCheckboxChange = (dayName) => {
    const selectedDays = formik.values.selectedDays.includes(dayName)
      ? formik.values.selectedDays.filter((d) => d !== dayName)
      : [...formik.values.selectedDays, dayName];
    formik.setFieldValue("selectedDays", selectedDays);
  };

  return (
    <div
      className={`${
        isSettingsMenuOpen ? `flexCenter` : `hidden`
      } fixed top-0 left-0 right-0 bottom-0 bg-gray-600/25 backdrop-blur-sm z-50`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-10 py-7 bg-black relative rounded-lg w-[540px]"
      >
        <h4 className="mb-5 text-gray-400">{selectedBranch?.name} 🎯</h4>
        <div className="w-full grid grid-cols-2">
          <ul className="flex flex-col gap-y-3">
            <li className="flexStart font-light gap-x-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-md  checked:bg-blue-600 border-2 border-blue-500/50 bg-grey-700"
                checked={
                  formik.values.selectedDays.length === Object.keys(day).length
                }
                onChange={() => {
                  const allDays = Object.keys(day);
                  const isAllSelected =
                    formik.values.selectedDays.length === allDays.length;
                  formik.setFieldValue(
                    "selectedDays",
                    isAllSelected ? [] : allDays
                  );
                }}
              />
              All Days
            </li>
            {Object.keys(day)
              .slice(0, 3)
              .map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flexStart font-light gap-x-3"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md  checked:bg-blue-600 border-2 border-blue-500/50 bg-grey-700"
                    checked={formik.values.selectedDays.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </li>
              ))}
          </ul>
          <ul className="flex flex-col gap-y-3">
            {Object.keys(day)
              .slice(3)
              .map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flexStart font-light gap-x-3"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded-md  checked:bg-blue-600 border-2 border-blue-500/50 bg-grey-700"
                    checked={formik.values.selectedDays.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                  {item}
                </li>
              ))}
          </ul>
        </div>
        {formik.touched.selectedDays && formik.errors.selectedDays && (
          <p className="text-red-500 text-sm mt-2">
            {formik.errors.selectedDays}
          </p>
        )}
        <div className="grid grid-cols-2 mt-10 gap-4">
          <div className="flex flex-col gap-y-2 gap-x-4">
            <span className="text-gray-500 text-sm">Min Target</span>
            <input
              type="text"
              name="minTarget"
              className="p-3 border-blue-500/45 border rounded-lg bg-black text-sm"
              placeholder="Enter Min Target"
              value={formik.values.minTarget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.minTarget && formik.errors.minTarget && (
              <p className="text-red-500 text-sm">{formik.errors.minTarget}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 gap-x-4">
            <span className="text-gray-500 text-sm">Max Target</span>
            <input
              type="text"
              name="maxTarget"
              className="p-3 rounded-lg border-blue-500/45 border bg-black text-sm"
              placeholder="Enter Max Target"
              value={formik.values.maxTarget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.maxTarget && formik.errors.maxTarget && (
              <p className="text-red-500 text-sm">{formik.errors.maxTarget}</p>
            )}
          </div>
        </div>
        <div className="flexEnd w-full mt-7">
          <button
            type="submit"
            className="text-sm bg-blue-600 text-white py-3 px-6 rounded-lg"
          >
            Save changes
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            formik.resetForm(); // Reset the form values to their initial state
            setSettingsMenuOpen(false); // Close the modal
          }}
          className="absolute text-blue-500 hover:text-white hover:scale-110 transition-all duration-300 top-5 right-5"
        >
          <CloseIcon />
        </button>
      </form>
    </div>
  );
};

export default TargetSettingsModal;
