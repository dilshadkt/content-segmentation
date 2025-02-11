import React from "react";
import NoDataLoading from "../../shared/loading";

const ReportCard = ({ data, isError, isLoading }) => {
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className="h-[380px] col-span-1 lg:col-span-2"
      />
    );
  }
  return (
    <div className="bg-[#0D0D0D] h-full p-5 rounded-lg flex flex-col">
      <span className="text-2xl font-semibold">C1</span>
      <div className="flex flex-col mt-5 gap-y-3">
        <div className="flexBetween">
          <div className="flex flex-col">
            <p className="text-sm font-light text-[#FAFAFA]">Cashier Name</p>
            <button className="flexStart text-lg text-[#A4F4E7] gap-x-2">
              {data?.EmployeeName}
              <img src="/icons/arrowDown.svg" alt="" />
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-light text-[#FAFAFA]">Opening Balance</p>
            <span className="text-xl font-semibold">
              {data?.OpeningBalance} AED
            </span>
          </div>
        </div>
        <p className="text-sm font-light text-[#FAFAFA]">Shift Timing</p>
        <div className="flexBetween text-lg">
          <h5 className="">In</h5>
          <span className="font-light text-gray-400 text-base">
            {data?.ShiftIN}
          </span>
        </div>
        <div className="flexBetween text-lg ">
          <h5>Out</h5>
          <span className="font-light text-base text-gray-400">
            {data?.ShiftOUT}
          </span>
        </div>
        <h4 className="mt-2 text-lg">Closing Balance</h4>
        {/* <p className="text-sm font-light text-[#FAFAFA]">Shift not done!</p> */}
        <p className="text-sm font-light text-[#FAFAFA]">
          {data?.ClosingBalance}
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
