import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../../../components/shared/datePicker";
import TodayInsightGraph from "..";
import { UseCommon } from "../../../../../hooks/UseCommon";

const InsightGraphHeader = ({ setDate, date }) => {
  const { setFullScreenModalOpen, isFullScreenModalOpen, setGraph } =
    UseCommon();
  return (
    <div className="absolute top-4  flexBetween  left-0 pl-5 2xl:pl-14 pr-5 right-0 w-full ">
      <div className="flexStart gap-x-2">
        <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
          <div className="w-[6px] h-[6px] rounded-full bg-[#1A9FFF]"></div>
          <span className="font-light text-xs 2xl:text-sm text-[#898384]">
            Revenue
          </span>
        </div>
        <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
          <div className="w-[6px] h-[6px] rounded-full bg-[#6F57DE]"></div>
          <span className="font-light text-xs 2xl:text-sm text-[#898384]">
            Profilt
          </span>
        </div>
        <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
          <div className="w-[6px] h-[6px] rounded-full bg-[#2ECC71]"></div>
          <span className="font-light text-xs 2xl:text-sm text-[#898384]">
            Expences
          </span>
        </div>
      </div>
      <div className="flexEnd gap-x-4">
        <DateSelector
          setDate={setDate}
          initialDate={date}
          dateOption={["This Month", "Previous Month", "Custom"]}
        />
        {!isFullScreenModalOpen ? (
          <button
            onClick={() => {
              setFullScreenModalOpen(true);
              setGraph(
                <TodayInsightGraph
                  className={" w-[96%]  md:w-[80%]  h-fit md:h-[65%]"}
                  graphClassName={" h-[250px] md:h-[400px]"}
                  initialDate={date}
                />
              );
            }}
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

export default InsightGraphHeader;
