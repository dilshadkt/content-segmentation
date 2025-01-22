import React from "react";
import { formatAmount } from "../../../../lib/FormateAmount";
import { cardsData } from "../../../../constants";

const StatCards = ({ insightData }) => {
  return (
    <div className="h-full grid gap-y-3 md:grid-cols-3 gap-x-4">
      {cardsData.map((data) => (
        <div
          key={data.id}
          className={`rounded-xl p-3 gap-y-1  flex justify-center flex-col ${data.bgColor}`}
        >
          <img src={data.icon} alt="" className="w-8" />
          <span className="font-semibold text-[#9F9C9C] text-lg mt-1">
            {formatAmount(insightData?.[data.dataKey] || 0)}
          </span>
          <span className="font-medium text-[#9F9C9C]">{data.title}</span>
          <span className="font-light text-xs text-[#898384] -translate-y-[2px]">
            {data.description}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
