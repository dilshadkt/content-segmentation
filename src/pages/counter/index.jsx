import React from "react";
import { UseCommon } from "../../hooks/UseCommon";
import CashierPerformance from "../../components/cahierReport/performance";
import CounterNumber from "../../components/counterReport/counterNumber";
import ReportCard from "../../components/counterReport/reportCard";
import LiveCounterDetails from "../../components/counterReport/liveCoutnerDetails";

const CounterReport = () => {
  const { isSideBarOpen } = UseCommon();
  return (
    <section
      className="w-full h-full   font-radio  
    overflow-x-hidden  overflow-y-auto  gap-y-3 flex flex-col"
    >
      <CounterNumber />

      <section
        className={`w-full  md:overflow-y-auto  gap-x-3 h-full grid ${
          isSideBarOpen
            ? `grid-cols-1  lg:grid-cols-5 2xl:grid-cols-4`
            : `  lg:grid-cols-4`
        }  `}
      >
        <div
          className={` col-span-1 h-fit lg:col-span-3 gap-3 grid ${
            isSideBarOpen ? ` 2xl:grid-cols-2` : `xl:grid-cols-2`
          }  `}
        >
          <div className="md:h-[380px] ">
            <ReportCard />
          </div>
          <div className=" md:h-[380px]">
            <CashierPerformance
              innerRadius={58}
              outerRadius={95}
              className={"h-full"}
              graphClassName={"-translate-y-20"}
            />
          </div>
          <div className="md:h-[380px] ">
            <ReportCard />
          </div>
          <div className=" md:h-[380px]">
            <CashierPerformance
              innerRadius={58}
              outerRadius={95}
              className={"h-full"}
              graphClassName={"-translate-y-20"}
            />
          </div>
        </div>
        {/* Live Counter Details  */}
        <LiveCounterDetails />
      </section>
    </section>
  );
};

export default CounterReport;
