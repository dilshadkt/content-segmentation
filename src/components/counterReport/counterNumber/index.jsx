import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { CounterDetails } from "../../../api/counter";

const CounterNumber = ({ setSelectedCounter, selectedCounter }) => {
  const { data } = useQuery("counterNumber", () => CounterDetails(), {
    select: (data) => data?.data?.counterDetails,
    onSuccess: (data) => {
      setSelectedCounter(data[0].CounterNumber);
    },
  });
  useEffect(() => {
    setSelectedCounter(data[0].CounterNumber);
  }, []);

  return (
    <div className="flex flex-col   ">
      <span className="text-sm  text-white">Counter Number</span>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8  gap-2     py-1 mt-2">
        {data?.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCounter(item.CounterNumber)}
            className={`border-2 flexCenter rounded-xl border-[#383838] hover:border-[#6F57DE]/90
        transition-all duration-200  text-sm py-3  text-[#FAFAFA]/50 hover:text-[#FAFAFA]
      cursor-pointer px-12 hover:shadow-sm ${
        selectedCounter === item.CounterNumber &&
        `border-[#6F57DE]/90 shadow-[#6F57DE]/65`
      } hover:shadow-[#6F57DE]/65
      `}
          >
            {item.CounterNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterNumber;
