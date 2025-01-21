import React from "react";
import { VscArrowDown } from "react-icons/vsc";

const StatCard = ({ stat }) => {
  return (
    <div
      className="border-[#898384]/70 group hover:border-[#92A5B5] hover:shadow-lg
                hover:shadow-[#92A5B5]/20 cursor-pointer rounded-lg border
                flex items-center justify-center gap-x-2 md:flex-col gap-y-3 lg:w-[210px]
                h-[70px] sm:h-[120px] md:h-[120px] "
    >
      <span className=" text-xs md:text-sm text-gray-600 group-hover:text-gray-300">
        {stat.label}
      </span>
      <button className="text-[#898384] md:text-2xl font-light">
        <VscArrowDown />
      </button>
    </div>
  );
};

export default StatCard;
