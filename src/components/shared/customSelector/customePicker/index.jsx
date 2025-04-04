import { X } from "lucide-react";
import React, { useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const CustomeDateModal = ({
  setShowCustomModal,
  handleCustomDateSubmit,
  dateRangeForCustome,
  setDateRangeForCustome,
}) => {
  // Refs for input fields
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[1000] flex items-center justify-center">
      <div className="bg-black border border-gray-800 shadow-md p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Select Date Range</h3>
          <button
            onClick={() => setShowCustomModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleCustomDateSubmit}>
          <div className="space-y-4">
            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  ref={fromDateRef}
                  value={dateRangeForCustome.from}
                  onChange={(e) =>
                    setDateRangeForCustome({
                      ...dateRangeForCustome,
                      from: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-transparent border border-gray-800 rounded-md"
                />
                <span
                  className="absolute cursor-pointer right-4 top-0 bottom-0 my-auto h-fit"
                  onClick={() => fromDateRef.current?.showPicker()}
                >
                  <FaCalendarAlt />
                </span>
              </div>
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  ref={toDateRef}
                  value={dateRangeForCustome.to}
                  onChange={(e) =>
                    setDateRangeForCustome({
                      ...dateRangeForCustome,
                      to: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-transparent border border-gray-800 rounded-md"
                />
                <span
                  className="absolute cursor-pointer right-4 top-0 bottom-0 my-auto h-fit"
                  onClick={() => toDateRef.current?.showPicker()} // Open date picker
                >
                  <FaCalendarAlt />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-gray-300 py-2 rounded-md border text-sm border-violet-800 hover:shadow-sm hover:shadow-violet-600"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomeDateModal;
