import React from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { UseCommon } from "../../../hooks/UseCommon";
import LanguagePicker from "./CountryPicker";
import UserProfile from "./userProfile";
const DashboardHeader = () => {
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  return (
    <div className="h-[70px] mt-4 grid grid-cols-5  px-4 md:px-10 ">
      <div className="col-span-2 relative">
        {/* <LanguagePicker /> */}
        {/* {!isSideBarOpen && (
          <button
            className="absolute hidden md:block  top-0 bottom-0 my-auto left-0"
            onClick={() => setSideBarOpen(true)}
          >
            <DehazeIcon />
          </button>
        )} */}
      </div>
      <div className="col-span-3 flexEnd md:flexBetween">
        <div></div> {/*dummy for ui*/}
        {/* <div className=" hidden md:flexStart gap-x-5">
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
        </div> */}
        <UserProfile />
      </div>
    </div>
  );
};

export default DashboardHeader;
