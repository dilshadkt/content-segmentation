import React from "react";

const WeekPerformance = () => {
  return (
    <div className="w-full grid h-full  gap-3 grid-cols-2 md:grid-cols-3">
      {new Array(6).fill(" ").map((item, index) => (
        <div
          key={index}
          className=" min-h-[160px] h-full relative rounded-lg flexCenter bg-[#0D0D0D]"
        >
          <div className="flexStart">
            <span>200.00</span>
            <span>AED</span>
          </div>
          <span
            className="absolute text-[#9F9C9C] w-fit
        text-xs md:text-sm left-0 right-0 mx-auto top-3"
          >
            Week 1
          </span>
          <span
            className="absolute flexStart
         gap-x-1 text-[#15B097] w-fit text-xs  right-3 mx-auto bottom-3"
          >
            10%
            <img src="/icons/growGreen.svg" alt="" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default WeekPerformance;
