import React from "react";
import { UseCommon } from "../../../hooks/UseCommon";

const TargetArchived = () => {
  const { isSideBarOpen } = UseCommon();
  return (
    <div
      className={`bg-[#0D0D0D] ${
        isSideBarOpen
          ? ` col-span-1 lg:col-span-2 2xl:col-span-1`
          : `col-span-1`
      }  py-5 px-4  `}
    >
      <div className="flexBetween">
        <span>Target Archived</span>
        <span className="text-sm">Sales Man List</span>
      </div>
      <div className="flex flex-col gap-y-3 mt-7">
        {new Array(6).fill(" ").map((item, index) => (
          <div
            key={index}
            className="p-2  flexStart cursor-pointer group rounded-lg gap-x-3 hover:bg-[#9F9C9C]"
          >
            <div className="w-16  rounded-lg h-16  bg-gray-800 flexCenter overflow-hidden ">
              <img
                src="/image/profile2.svg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-start h-16  ">
              <span className="font-medium group-hover:text-[#FAFAFA]">
                Nooman
              </span>
              <p className="text-xs text-[#666666] group-hover:text-[#DADADA]">
                Top sale - 30000.00
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetArchived;
