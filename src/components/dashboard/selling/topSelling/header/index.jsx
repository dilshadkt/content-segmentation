import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../../shared/datePicker";
import TopSelling from "..";
import { UseCommon } from "../../../../../hooks/UseCommon";
const TopSellingDepartmentHeader = ({ date, setDate }) => {
  const { isFullScreenModalOpen, setFullScreenGraph, setFullScreenModalOpen } =
    UseCommon();
  return (
    <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
      <span className="text-[#9F9C9C] font-semibold">
        Top Selling Departments
      </span>
      <div className="flexEnd gap-x-4">
        <DateSelector setDate={setDate} initialDate={date} />
        {!isFullScreenModalOpen ? (
          <button
            onClick={() =>
              setFullScreenGraph(
                <TopSelling
                  className={" w-[96%] md:w-2/3 h-fit md:h-[65%]"}
                  initialDate={date}
                />
              )
            }
          >
            <img src="/icons/fullView.svg" alt="" className="w-3" />
          </button>
        ) : (
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TopSellingDepartmentHeader;
