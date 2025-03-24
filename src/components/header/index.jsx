import React from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { UseCommon } from "../../hooks/UseCommon";
import { FaUser } from "react-icons/fa";

const DashboardHeader = () => {
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  return (
    <div className="h-[70px] mt-4 flexBetween  px-4 md:px-10 ">
      <div className="col-span-2 relative">
        {!isSideBarOpen && (
          <button
            className="absolute top-0 bottom-0 my-auto left-0"
            onClick={() => setSideBarOpen(true)}
          >
            <DehazeIcon />
          </button>
        )}
      </div>
      <div className="col-span-3 flexEnd md:flexBetween">
        <div className="flexEnd gap-x-3 md:gap-x-6">
          <div
            className="w-[40px] aspect-square overflow-hidden 
        flexCenter text-gray-500 border-gray-500  border-dashed border-2 cursor-pointer hover:border-gray-100
        hover:text-gray-200 rounded-full"
          >
            <FaUser />
          </div>
          <div className="flexStart gap-x-14">
            <div className="md:flex hidden flex-col font-light text-sm">
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
