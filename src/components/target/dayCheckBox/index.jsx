export const DayCheckbox = ({ day, isChecked, onChange }) => (
  <li className="flexStart font-light gap-x-3">
    <input
      type="checkbox"
      className="w-5 h-5 rounded-md checked:bg-blue-600 border-2 border-blue-500/50 bg-grey-700"
      checked={isChecked}
      onChange={onChange}
    />
    {day}
  </li>
);
