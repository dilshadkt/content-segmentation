import React from "react";
import { UseCommon } from "../../../hooks/UseCommon";

const LiveCounterDetails = () => {
  const { isSideBarOpen } = UseCommon();
  return (
    <div
      className={`bg-[#0D0D0D] h-fit md:overflow-y-auto ${
        isSideBarOpen
          ? ` col-span-1 lg:col-span-2 2xl:col-span-1`
          : `col-span-1`
      }  py-5 px-4  `}
    >
      <h4 className=" text-lg text-[#FAFAFA] font-semibold">
        Live Counter Details
      </h4>
      <div className="flex flex-col gap-y-1">
        <div className="flexStart mt-5 text-sm gap-x-2">
          <span>Remaining Auto Sync Time </span>
          <span className="text-[#6F57DE]">07:12</span>
        </div>
        <p className="text-sm   text-[#8080808C]/50">
          Counter will automatically update every hour.
        </p>
        <div className="flexEnd">
          <button
            className="flexCenter gap-x-2 border py-3 group border-[#6F57DE]/50 
      hover:border-[#6F57DE] hover:shadow-lg hover:shadow-[#6F57DE]/20 px-4 rounded-lg text-sm"
          >
            <span className="group-hover:text-[#6F57DE]">Sync Manual</span>
            <img
              src="/icons/refresh.svg"
              alt=""
              className="w-5 group-hover:rotate-45 transition-all duration-300"
            />
          </button>
        </div>
        <div className="flex flex-col gap-y-4  mt-4">
          {new Array(4).fill(" ").map((item, index) => (
            <div key={index} className="flex  text-xs flex-col gap-y-3">
              <div className="flexBetween">
                <h5 className="text-sm">Counter 1</h5>
                <button>
                  <img
                    src="/icons/eye.svg"
                    alt=""
                    className="w-5 hover:scale-110 transition-all duration-300"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-y-3 p-4 rounded-lg border border-[#6F57DE]">
                <div className="flexBetween text-sm">
                  <span>Total Invoice of the Day</span>
                  <span className="text-xs">12</span>
                </div>
                <div className="flexBetween">
                  <span>Total Amount</span>
                  <span className="text-xs">1110.00 AED</span>
                </div>
                <div className="flexBetween">
                  <span>Last Invoice Time</span>
                  <span className="text-xs">11:48am</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCounterDetails;
