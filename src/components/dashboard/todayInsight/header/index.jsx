import React from "react";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

const Header = ({ setShowCustomModal, date }) => {
  const today = getFormattedDate(0);

  return (
    <div className="flexBetween">
      <div className="flex flex-col ">
        <h4 className="text-[#B5B3B3] font-bold md:text-3xl">Today Insights</h4>
        <span className=" text-xs md:text-sm text-[#737791] mt-1">
          Income Statement Summary
        </span>
      </div>
      <div className="flexStart gap-x-3">
        <div className="flexStart gap-x-3">
          <span className="text-[#CED7DE] text-sm hidden md:block">
            {date?.from !== today ? (
              <span className="text-xs">
                {date?.from} - {date?.to}
              </span>
            ) : (
              `Select Date Range`
            )}
          </span>
          <button onClick={() => setShowCustomModal(true)}>
            <img src="/icons/calender.svg" alt="" />
          </button>
        </div>
        <button className="flexStart gap-x-2 border px-3 py-2 rounded-lg border-[#253A4D]">
          <img src="/icons/export.svg" alt="" />
          <span className="text-[#898384] text-sm">Export</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
