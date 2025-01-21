import React from "react";

const DepartmentOverview = () => {
  return (
    <div className=" md:h-[380px] grid grid-cols-2 gap-3">
      {new Array(6).fill(" ").map((item, index) => (
        <div
          key={index}
          className="h-[120px] relative border
    flexStart p-4 border-[#383838] hover:border-[#6f6e6e]
    hover:shadow-lg hover:shadow-[#6f6e6e]/20 cursor-pointer rounded-lg"
        >
          <div className="flex flex-col gap-y-2">
            <h5 className=" text-sm text-[#737791]">
              Top Sales in Each Category{" "}
            </h5>
            <span>30000.000 AED</span>
          </div>
          <span className="flexCenter gap-x-1  text-[10px] absolute right-4 bottom-4">
            10%
            <img src="/icons/growWhite.svg" alt="" className="w-2" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default DepartmentOverview;
