import React from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { UseCommon } from "../../hooks/UseCommon";
const DashboardHeader = () => {
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  return (
    <div className="h-[70px] mt-4 grid grid-cols-5  px-4 md:px-10 ">
      <div className="col-span-2 relative">
        <div className="hidden md:flexCenter gap-x-3 h-full w-full">
          <div className="w-5 rounded-full  overflow-hidden aspect-square ">
            <img
              src="/image/flag.svg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[#726C6C] font-semibold hidden md:block">
            Eng(US)
          </span>
          <button className="ml-2">
            <img src="/icons/arrowDown.svg" alt="" className="w-3" />
          </button>
        </div>
        {!isSideBarOpen && (
          <button
            className="absolute hidden md:block  top-0 bottom-0 my-auto left-0"
            onClick={() => setSideBarOpen(true)}
          >
            <DehazeIcon />
          </button>
        )}
      </div>
      <div className="col-span-3 flexEnd md:flexBetween">
        <div className=" hidden md:flexStart gap-x-5">
          <button className="flexStart gap-x-3">
            <span className="font-bold">Day</span>{" "}
            <img src="/icons/arrowDown.svg" alt="" />
          </button>
          <button className="flexStart gap-x-2 border px-4 py-2 rounded-lg border-[#253A4D]">
            <img src="/icons/export.svg" alt="" />
            <span className="text-[#898384] text-sm">Export</span>
          </button>
          <button className="relative ml-3">
            <img src="/icons/reminder.svg" alt="" />
            <div className="w-2 h-2 rounded-full bg-[#EE6E6E] absolute -top-1 -right-1"></div>
          </button>
        </div>
        <div className="flexEnd gap-x-3 md:gap-x-6">
          <div
            className="w-[40px] aspect-square overflow-hidden 
        flexCenter  rounded-full md:rounded-lg"
          >
            <img
              src="/image/profile.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flexStart gap-x-14">
            <div className="md:flex hidden flex-col font-light text-sm">
              <span className="text-[#8C79E5] font-medium">Musfig</span>
              <span className="text-xs text-[#726C6C]">Admin</span>
            </div>
            <button>
              <img src="/icons/arrowDown.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
