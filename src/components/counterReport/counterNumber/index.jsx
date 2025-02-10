import React from "react";
import { useQuery } from "react-query";
import { CounterDetails } from "../../../api/counter";

const CounterNumber = () => {
  const { data } = useQuery("counterNumber", () => CounterDetails(), {
    select: (data) => data?.data?.counterDetails,
  });
  return (
    <div className="flex flex-col   ">
      <span className="text-sm  text-white">Counter Number</span>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8  gap-2     py-1 mt-2">
        {data?.map((item, index) => (
          <div
            key={index}
            className="border-2 flexCenter rounded-xl border-[#383838] hover:border-[#6F57DE]/90
        transition-all duration-200  text-sm py-3  text-[#FAFAFA]/50 hover:text-[#FAFAFA]
      cursor-pointer px-12 hover:shadow-sm hover:shadow-[#6F57DE]/65
      "
          >
            C{item.CounterNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterNumber;
