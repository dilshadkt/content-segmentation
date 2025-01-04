import React from "react";

const ReportCard = () => {
  return (
    <div className="bg-[#0D0D0D] h-full p-5 rounded-lg flex flex-col">
      <span className="text-2xl font-semibold">C1</span>
      <div className="flex flex-col mt-5 gap-y-3">
        <div className="flexBetween">
          <div className="flex flex-col">
            <p className="text-sm font-light text-[#FAFAFA]">Cashier Name</p>
            <button className="flexStart text-lg text-[#A4F4E7] gap-x-2">
              Muhammed Sahal <img src="/icons/arrowDown.svg" alt="" />
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-light text-[#FAFAFA]">Opening Balance</p>
            <span className="text-xl font-semibold">1000.00 AED</span>
          </div>
        </div>
        <p className="text-sm font-light text-[#FAFAFA]">Shift Timing</p>
        <div className="flexBetween text-lg">
          <h5 className="">In</h5>
          <span className="font-light text-gray-400 text-base">10:00 AM</span>
        </div>
        <div className="flexBetween text-lg ">
          <h5>Out</h5>
          <span className="font-light text-base text-gray-400">
            Shift in progress
          </span>
        </div>
        <h4 className="mt-2 text-lg">Closing Balance</h4>
        <p className="text-sm font-light text-[#FAFAFA]">Shift not done!</p>
      </div>
    </div>
  );
};

export default ReportCard;
