import React from "react";
import { UseCommon } from "../../hooks/UseCommon";
import OverAllPerfomance from "./overAllPerformance";
import TeamPerformance from "./teamPerformance";
import WeekPerformance from "./weekPerformance";
import Perfomance from "./performance";
import TargetArchived from "./targetArchived";

const SalesReports = () => {
  const { isSideBarOpen } = UseCommon();

  return (
    <section
      className={`w-full font-radio overflow-y-auto  gap-x-3 h-full grid ${
        isSideBarOpen
          ? `grid-cols-1  lg:grid-cols-5 2xl:grid-cols-4`
          : `  lg:grid-cols-4`
      }  `}
    >
      <div
        className={` col-span-1 lg:col-span-3 gap-3 grid ${
          isSideBarOpen ? ` 2xl:grid-cols-2` : `xl:grid-cols-2`
        }  `}
      >
        <div className="md:h-[380px]">
          <OverAllPerfomance className={"h-full"} />
        </div>
        <div className="h-[380px]">
          <TeamPerformance className={"h-full"} />
        </div>
        <WeekPerformance />
        <Perfomance />
      </div>
      <TargetArchived />
    </section>
  );
};

export default SalesReports;
