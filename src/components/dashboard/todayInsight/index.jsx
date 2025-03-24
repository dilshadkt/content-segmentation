import React, { useState } from "react";
import { cardsData } from "../../../constants";
import { getTodayInsight } from "../../../api/hook";
import NoDataLoading from "../../shared/loader";
import DateSelector from "../../../components/shared/customSelector/index";
import { getFormattedDate } from "../../../lib/GetFormatedDate";

const TodayInsight = ({ className }) => {
  const [date, setDate] = useState({
    from: getFormattedDate(0),
    to: getFormattedDate(0),
  });
  const { data, isLoading } = getTodayInsight(date);

  if (isLoading) return <NoDataLoading className={"lg:col-span-3"} />;
  return (
    <div
      className={`lg:col-span-3 bg-[#0D0D0D] gap-y-6 flex flex-col
     p-5 rounded-xl ${className}`}
    >
      <div className="flexBetween">
        <div className="flex flex-col ">
          <h4 className="text-[#B5B3B3] font-bold md:text-3xl">
            Sales Insights
          </h4>
          <span className=" text-xs md:text-sm text-[#737791] mt-1">
            Income Statement Summary
          </span>
        </div>
        <div>
          <DateSelector
            setDate={setDate}
            dateOption={["Today", "Yesterday", "This Week", "Previous Week"]}
            initialDate={date}
          />
        </div>
      </div>
      <div className="h-full grid gap-y-3 md:grid-cols-3 gap-x-4">
        {/* icome  */}
        <div
          className={`rounded-xl p-3 gap-y-1  flex justify-center flex-col bg-[#2E00FF3D]/25`}
        >
          <img src={"/icons/icome.svg"} alt="" className="w-8" />
          <span className="font-semibold text-[#9F9C9C] text-lg mt-1">
            {data?.Income}
          </span>
          <span className="font-medium text-[#9F9C9C]">Income</span>
          <span className="font-light text-xs text-[#898384] -translate-y-[2px]">
            Based On Sales
          </span>
        </div>
        {/* expense  */}
        <div
          className={`rounded-xl p-3 gap-y-1  flex justify-center flex-col bg-[#460068]`}
        >
          <img src={"/icons/expense.svg"} alt="" className="w-8" />
          <span className="font-semibold text-[#9F9C9C] text-lg mt-1">
            {data?.Expense}
          </span>
          <span className="font-medium text-[#9F9C9C]">Expense</span>
          <span className="font-light text-xs text-[#898384] -translate-y-[2px]">
            +5% from yesterday
          </span>
        </div>
        {/* Profit  */}
        <div
          className={`rounded-xl p-3 gap-y-1  flex justify-center flex-col bg-[#033B00]`}
        >
          <img src={"/icons/profit.svg"} alt="" className="w-8" />
          <span className="font-semibold text-[#9F9C9C] text-lg mt-1">
            {data?.GrossProfit}
          </span>
          <span className="font-medium text-[#9F9C9C]">Gross Profit</span>
          <span className="font-light text-xs text-[#898384] -translate-y-[2px]">
            +1.2% from yesterday
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodayInsight;
