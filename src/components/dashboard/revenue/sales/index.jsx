import React, { useState } from "react";
import { useQuery } from "react-query";
import { totalSales } from "../../../../api/dashbaord";
import { UseCommon } from "../../../../hooks/UseCommon";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import NoDataLoading from "../../../shared/loading";

import SalesChart from "./areaChart";
import SalesHeader from "./header";

const SalesAreaChart = ({ className, graphClassName, initialDate }) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(dayOfWeek),
    to: initialDate?.to || getFormattedDate(0),
  });
  const {
    data: salesData,
    isLoading,
    isError,
  } = useQuery(["saleData", date], () => totalSales(date), {
    select: (data) => data?.data?.salesData,
  });

  const noData = salesData?.every(
    (item) => item?.["Last Week"] === 0 && item?.["This Week"] === 0
  );
  const { isSideBarOpen } = UseCommon();

  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : `lg:h-full lg:col-span-2 `
        }  h-[290px]  `}
      />
    );
  }
  const renderContent = () => {
    if (noData) {
      return (
        <NoDataLoading
          noData={noData}
          className={`${
            isSideBarOpen
              ? `col-span-1 2xl:col-span-2`
              : `lg:h-full lg:col-span-2 `
          }  h-[290px] pt-14 `}
        />
      );
    } else {
      return (
        <SalesChart salesData={salesData} graphClassName={graphClassName} />
      );
    }
  };
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:h-full lg:col-span-2 `
      }  h-[290px]  flex flex-col items-end justify-start 
    overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4  ${className}`}
    >
      <SalesHeader date={date} setDate={setDate} />
      {renderContent()}
    </section>
  );
};

export default SalesAreaChart;
