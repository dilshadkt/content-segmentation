import React, { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown, X } from "lucide-react";
import { DATE_OPTIONS } from "../../../constants";
import CustomeDateModal from "./customePicker";
import { getFormattedDate } from "../../../lib/GetFormatedDate";
import { getInitailDate } from "../../../lib/GetInitalDate";

const DateSelector = ({ setDate, initialDate, dateOption = DATE_OPTIONS }) => {
  // Store selected option in state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    getInitailDate(initialDate)
  );
  const menuRef = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });

  const [dateRangeForCustome, setDateRangeForCustome] = useState({
    from: getFormattedDate(0),
    to: getFormattedDate(0),
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
    const startOfQuarter = new Date(
      today.getFullYear(),
      Math.floor(today.getMonth() / 3) * 3,
      1
    );
    const startOfYear = new Date(today.getFullYear(), 0, 2);

    let newDateRange = { ...dateRange };

    switch (option) {
      case "Today":
        newDateRange = { from: getFormattedDate(0), to: getFormattedDate(0) };
        break;
      case "This Week":
        const dayOfWeek = today.getDay();
        newDateRange = {
          from: getFormattedDate(dayOfWeek),
          to: getFormattedDate(0),
        };
        break;
      case "This Month":
        newDateRange = {
          from: startOfMonth.toISOString().split("T")[0],
          to: getFormattedDate(0),
        };
        break;
      case "This Quarter":
        newDateRange = {
          from: startOfQuarter.toISOString().split("T")[0],
          to: getFormattedDate(0),
        };
        break;
      case "This Year":
        newDateRange = {
          from: startOfYear.toISOString().split("T")[0],
          to: getFormattedDate(0),
        };
        break;
      case "Yesterday":
        newDateRange = { from: getFormattedDate(1), to: getFormattedDate(1) };
        break;
      case "Previous Week":
        newDateRange = { from: getFormattedDate(14), to: getFormattedDate(7) };
        break;
      case "Previous Month":
        const prevMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastDayPrevMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        newDateRange = {
          from: prevMonth.toISOString().split("T")[0],
          to: lastDayPrevMonth.toISOString().split("T")[0],
        };
        break;
      case "Previous Quarter":
        const prevQuarter = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3 - 3,
          1
        );
        const lastDayPrevQuarter = new Date(
          today.getFullYear(),
          Math.floor(today.getMonth() / 3) * 3,
          0
        );
        newDateRange = {
          from: prevQuarter.toISOString().split("T")[0],
          to: lastDayPrevQuarter.toISOString().split("T")[0],
        };
        break;
      case "Previous Year":
        const prevYear = new Date(today.getFullYear() - 1, 0, 1);
        const lastDayPrevYear = new Date(today.getFullYear() - 1, 11, 31);
        newDateRange = {
          from: prevYear.toISOString().split("T")[0],
          to: lastDayPrevYear.toISOString().split("T")[0],
        };
        break;
      case "Custom":
        setShowCustomModal(true);
        return;
      default:
        break;
    }

    setDateRange(newDateRange);
    setDate(newDateRange);
  };

  const handleCustomDateSubmit = (e) => {
    e.preventDefault();
    setDateRange(dateRangeForCustome);
    setDate(dateRangeForCustome);
    setSelectedOption("Custom");
    setShowCustomModal(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-gray-300 rounded-md shadow-sm"
      >
        <span className="text-xs md:text-sm font-medium whitespace-nowrap">
          {selectedOption}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          className="absolute overflow-y-auto right-0 z-10 mt-2
          whitespace-nowrap w-fit max-h-[180px] bg-black rounded-lg 
          text-xs shadow-lg border border-gray-800 overflow-hidden"
        >
          {dateOption.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-600 hover:text-white
                ${
                  selectedOption === option
                    ? "bg-gray-800 text-white"
                    : "text-gray-400"
                }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {showCustomModal && (
        <CustomeDateModal
          dateRangeForCustome={dateRangeForCustome}
          handleCustomDateSubmit={handleCustomDateSubmit}
          setDateRangeForCustome={setDateRangeForCustome}
          setShowCustomModal={setShowCustomModal}
        />
      )}
    </div>
  );
};

export default React.memo(DateSelector);
