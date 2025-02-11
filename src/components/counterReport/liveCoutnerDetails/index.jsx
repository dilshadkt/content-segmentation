import React from "react";
import { UseCommon } from "../../../hooks/UseCommon";
import NoDataLoading from "../../shared/loading";
import CounterReport from "./counterReport";

const LiveCounterDetails = ({ data, isLoading, isError, refetch }) => {
  const { isSideBarOpen } = UseCommon();

  const renderContent = () => {
    if (isLoading || isError) {
      return (
        <NoDataLoading
          isError={isError}
          className="h-[140px] col-span-1 lg:col-span-2"
        />
      );
    } else {
      return <CounterReport data={data} />;
    }
  };
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
        <div className="flexEnd mt-2">
          <button
            onClick={() => refetch()}
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
        <div className="flex flex-col gap-y-4  mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default LiveCounterDetails;
