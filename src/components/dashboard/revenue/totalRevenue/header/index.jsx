import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../../../components/shared/datePicker";
import TotalRevenueBarChart from "..";
import { UseCommon } from "../../../../../hooks/UseCommon";
const RevenueHeader = ({ date, setDate }) => {
  const { isFullScreenModalOpen, setFullScreenGraph, setFullScreenModalOpen } =
    UseCommon();
  return (
    <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
      <span className="text-[#9F9C9C] font-semibold">Total Revenue</span>
      <div className="flexEnd gap-x-4 ">
        <DateSelector
          setDate={setDate}
          initialDate={date}
          dateOption={["This Week", "Previous Week"]}
        />
        {!isFullScreenModalOpen ? (
          <button
            onClick={() =>
              setFullScreenGraph(
                <TotalRevenueBarChart
                  className={" w-[96%] md:w-full h-fit   md:h-full"}
                  graphClassName={" h-[230px] md:h-[400px]"}
                  initialDate={date}
                />
              )
            }
          >
            <img src="/icons/fullView.svg" alt="" className="w-3" />
          </button>
        ) : (
          <div className="w-full ">
            <button onClick={() => setFullScreenModalOpen(false)}>
              <CloseIcon className="text-white/45" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueHeader;
