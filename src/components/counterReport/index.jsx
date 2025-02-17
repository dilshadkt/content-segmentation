import React, { useState } from "react";
import CounterNumber from "./counterNumber";
import ReportCard from "./reportCard";
import CashierPerformance from "../cahierReport/performance";
import LiveCounterDetails from "./liveCoutnerDetails";
import { UseCommon } from "../../hooks/UseCommon";
import { useQuery } from "react-query";
import { CounterSummay } from "../../api/counter";

const CounterReports = () => {
  const { isSideBarOpen } = UseCommon();
  const [selectedCounter, setSelectedCounter] = useState(null);
  const { data, isLoading, isError, refetch } = useQuery(
    ["counterReports", selectedCounter],
    () => CounterSummay(selectedCounter),
    {
      select: (data) => data?.data,
    }
  );

  return (
    <section
      className="w-full h-full   font-radio  
overflow-x-hidden  overflow-y-auto  gap-y-3 flex flex-col"
    >
      <CounterNumber
        setSelectedCounter={setSelectedCounter}
        selectedCounter={selectedCounter}
      />

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
            <ReportCard
              data={data?.empSalesSummary?.[0]}
              isLoading={isLoading}
              isError={isError}
            />
          </div>
          <div className=" md:h-[380px] min-h-[300px]">
            <CashierPerformance
              innerRadius={58}
              outerRadius={95}
              className={"h-full"}
              graphClassName={"-translate-y-20"}
              data={data?.empDaysSummary}
              isError={isError}
              isLoading={isLoading}
            />
          </div>
        </div>
        {/* Live Counter Details  */}
        <LiveCounterDetails
          isLoading={isLoading}
          isError={isError}
          data={data?.empProductSummary?.[0]}
          refetch={refetch}
        />
      </section>
    </section>
  );
};

export default CounterReports;
