import React from "react";
import OverAllPerfomance from "../../components/saleMan/overAllPerformance";
import TeamPerformance from "../../components/saleMan/teamPerformance";
import { UseCommon } from "../../hooks/UseCommon";
import TargetArchived from "../../components/saleMan/targetArchived";
import WeekPerformance from "../../components/saleMan/weekPerformance";
import Perfomance from "../../components/saleMan/performance";

const SalesManReport = () => {
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
        {/* week section  */}
        <WeekPerformance />
        {/* Performance  */}
        <Perfomance />
      </div>
      {/* target archived section  */}
      <TargetArchived />
    </section>
  );
};

export default SalesManReport;
