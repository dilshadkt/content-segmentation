import React from "react";
import { cardsData } from "../../../constants";

const TodayInsight = ({ className }) => {
  return (
    <div
      className={`lg:col-span-3 bg-[#0D0D0D] gap-y-6 flex flex-col
     p-5 rounded-xl ${className}`}
    >
      <div className="flexBetween">
        <div className="flex flex-col ">
          <h4 className="text-[#B5B3B3] font-bold md:text-3xl">
            Today Insights
          </h4>
          <span className=" text-xs md:text-sm text-[#737791] mt-1">
            Income Statement Summary
          </span>
        </div>
        <div className="flexStart gap-x-3">
          <div className="flexStart gap-x-3">
            <span className="text-[#CED7DE] text-sm hidden md:block">
              Select Date Range
            </span>
            <button>
              <img src="/icons/calender.svg" alt="" />
            </button>
          </div>
          <button className="flexStart gap-x-2 border px-3 py-2 rounded-lg border-[#253A4D]">
            <img src="/icons/export.svg" alt="" />
            <span className="text-[#898384] text-sm">Export</span>
          </button>
        </div>
      </div>
      <div className="h-full grid gap-y-3 md:grid-cols-3 gap-x-4">
        {cardsData.map((data) => (
          <div
            key={data.id}
            className={`rounded-xl p-3 gap-y-1  flex justify-center flex-col ${data.bgColor}`}
          >
            <img src={data.icon} alt="" className="w-8" />
            <span className="font-semibold text-[#9F9C9C] text-lg mt-1">
              {data.amount}
            </span>
            <span className="font-medium text-[#9F9C9C]">{data.title}</span>
            <span className="font-light text-xs text-[#898384] -translate-y-[2px]">
              {data.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayInsight;
