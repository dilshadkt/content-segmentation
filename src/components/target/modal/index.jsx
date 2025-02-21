import CloseIcon from "@mui/icons-material/Close";
import { useTargetSettingsForm } from "../../../hooks/useTargetSettingsForm";
import { DayCheckbox } from "../dayCheckBox";
import CustomeInput from "../../shared/customeInput";

const TargetSettingsModal = ({
  isSettingsMenuOpen,
  day,
  setSettingsMenuOpen,
  selectedBranch,
}) => {
  const { formik, handleCheckboxChange, handleSelectAllDays, isSubmitting } =
    useTargetSettingsForm(selectedBranch, () => setSettingsMenuOpen(false));
  //  helper for close modal
  const handleClose = () => {
    formik.resetForm();
    setSettingsMenuOpen(false);
  };

  // split days into 2 columns for layout
  const allDays = Object.keys(day);
  const firstColumns = allDays.slice(0, 3);
  const secondColumns = allDays.slice(3);

  if (!isSettingsMenuOpen) {
    return null;
  }

  return (
    <div
      className={`fixed flexCenter top-0 left-0 right-0 bottom-0 bg-gray-600/25 backdrop-blur-sm z-50`}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="p-10 py-7 bg-black relative rounded-lg w-[540px]"
      >
        {/* header  */}
        <h4 className="mb-5 text-gray-400">{selectedBranch?.branchName} 🎯</h4>
        {/* day selection  */}
        <div className="w-full grid grid-cols-2">
          <ul className="flex flex-col gap-y-3">
            <DayCheckbox
              day={"All Days"}
              isChecked={formik.values.selectedDays.length === allDays.length}
              onChange={() => handleSelectAllDays(allDays)}
            />
            {firstColumns.map((item, index) => (
              <DayCheckbox
                key={`${item}-${index}`}
                day={item}
                isChecked={formik.values.selectedDays.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
            ))}
          </ul>
          <ul className="flex flex-col gap-y-3">
            {secondColumns.map((item, index) => (
              <DayCheckbox
                day={item}
                key={`${item}-${index}`}
                isChecked={formik.values.selectedDays.includes(item)}
                onChange={() => handleCheckboxChange(item)}
              />
            ))}
          </ul>
        </div>

        {/* validation message  */}
        {formik.touched.selectedDays && formik.errors.selectedDays && (
          <p className="text-red-500 text-sm mt-2">
            {formik.errors.selectedDays}
          </p>
        )}
        {/* target inputs  */}
        <div className="grid grid-cols-2 mt-10 gap-4">
          {/* min target  */}
          <CustomeInput
            errors={formik.errors}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            values={formik.values}
            title={"Min Target"}
            name={"minTarget"}
            className={"border-blue-500/45 border bg-black text-sm w-full"}
          />
          {/* max target  */}
          <CustomeInput
            errors={formik.errors}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
            values={formik.values}
            title={"Max Target"}
            name={"maxTarget"}
            className={"border-blue-500/45 border bg-black text-sm w-full"}
          />
        </div>
        {/* submit button  */}
        <div className="flexEnd w-full mt-7">
          <button
            disabled={isSubmitting}
            type="submit"
            className={`text-sm  ${
              isSubmitting ? `bg-blue-400` : `bg-blue-600`
            } text-white min-h-10 relative min-w-[130px]
             flexCenter py-3 px-6 rounded-lg`}
          >
            {isSubmitting ? (
              <img
                src="/gif/loader.gif"
                alt=""
                className="w-5   absolute left-0 right-0 top-0 bottom-0 m-auto"
              />
            ) : (
              "Save changes"
            )}
          </button>
        </div>
        {/* close  button  */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute text-blue-500 hover:text-white hover:scale-110 transition-all duration-300 top-5 right-5"
        >
          <CloseIcon />
        </button>
      </form>
    </div>
  );
};

export default TargetSettingsModal;
