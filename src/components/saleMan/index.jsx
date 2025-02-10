import React, { useState } from "react";
import { useQuery } from "react-query";
import { SaleEmployeeSummaryDetails } from "../../api/salesman";
import { UseCommon } from "../../hooks/UseCommon";
import { getFormattedDate } from "../../lib/GetFormatedDate";
import OverAllPerfomance from "./overAllPerformance";
import TargetArchived from "./targetArchived";
import TeamPerformance from "./teamPerformance";
import TeamPerformanceChart from "./teamPerformance/barChart";

const SalesReports = () => {
  const { isSideBarOpen } = UseCommon();
  const [selectedEmplyee, setSelectedEmplyee] = useState(null);

  const { data, isLoading, isError } = useQuery(
    ["sales", selectedEmplyee],
    () => SaleEmployeeSummaryDetails(selectedEmplyee),
    {
      select: (data) => data.data,
    }
  );
  return (
    <section
      className={`w-full font-radio overflow-y-auto  gap-x-3 h-full grid ${
        isSideBarOpen
          ? `grid-cols-1  lg:grid-cols-5 2xl:grid-cols-4`
          : `  lg:grid-cols-4`
      }  `}
    >
      <div
        className={` col-span-1  lg:col-span-3 gap-3 grid ${
          isSideBarOpen ? ` 2xl:grid-cols-2` : `xl:grid-cols-2`
        }  `}
      >
        <div className="md:h-[380px]  overflow-hidden">
          <TeamPerformance
            className={"h-full"}
            data={data?.empProductSummary[0]}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <div className="md:h-[380px]">
          <OverAllPerfomance
            isLoading={isLoading}
            isError={isError}
            className={"h-full"}
            data={data?.empSalesSummary}
          />
        </div>
        <div
          className={`w-full  ${
            isSideBarOpen ? `2xl:col-span-2` : ` col-span-2`
          } min-h-[380px] bg-[#0D0D0D]
           gap-3   flex flex-col     p-4 rounded-lg`}
        >
          <TeamPerformanceChart
            data={data?.empDaysSummary?.slice(0, 31).map((item) => ({
              ...item,
              InvDate: item.InvDate?.split("/")[0],
            }))}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
      <TargetArchived
        setSelectedEmplyee={setSelectedEmplyee}
        selectedEmplyee={selectedEmplyee}
      />
    </section>
  );
};

export default SalesReports;
