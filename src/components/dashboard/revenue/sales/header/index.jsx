import React from "react";
import DateSelector from "../../../../shared/datePicker";
import CloseIcon from "@mui/icons-material/Close";
import { UseCommon } from "../../../../../hooks/UseCommon";
import SalesAreaChart from "..";
const SalesHeader = ({ date, setDate }) => {
  const { isFullScreenModalOpen, setFullScreenGraph, setFullScreenModalOpen } =
    UseCommon();
  return (
    <div className="   flexBetween   pl-3  pr-5 right-0 w-full ">
      <span className="text-[#9F9C9C] font-semibold">Sales </span>
      <div className="flexEnd gap-x-4">
        <DateSelector
          setDate={setDate}
          initialDate={date}
          dateOption={["This Week", "Previous Week"]}
        />
        {!isFullScreenModalOpen ? (
          <button
            onClick={() =>
              setFullScreenGraph(
                <SalesAreaChart
                  className={` w-[96%] md:w-[80%]  h-fit md:h-[75%]`}
                  graphClassName={` h-[230px] md:h-[400px]`}
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

export default SalesHeader;
