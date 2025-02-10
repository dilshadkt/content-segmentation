import React, { useState } from "react";
import { useQuery } from "react-query";
import { totalRevenue } from "../../../../api/dashbaord";
import { UseCommon } from "../../../../hooks/UseCommon";
import NoDataLoading from "../../../shared/loading";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import Barchart from "./barchart";
import RevenueHeader from "./header";

const TotalRevenueBarChart = ({ className, graphClassName, initialDate }) => {
  const { isSideBarOpen } = UseCommon();
  const today = new Date();
  const dayOfWeek = today.getDay();
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(dayOfWeek),
    to: initialDate?.to || getFormattedDate(0),
  });
  const {
    isLoading,
    data: revenueData,
    isError,
  } = useQuery(["totalRevenue", date], () => totalRevenue(date), {
    select: (data) => data?.data?.revenue,
  });

  const noData = revenueData?.every(
    (data) => data?.Sales === 0 && data?.Expense === 0
  );

  if (isLoading || isError) {
    return (
      <NoDataLoading
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-3`
            : ` lg:h-full lg:col-span-3`
        } h-[290px] w-full `}
      />
    );
  }

  const renderContent = () => {
    if (noData) {
      return (
        <NoDataLoading
          noData={noData}
          className={` ${
            isSideBarOpen
              ? `col-span-1 2xl:col-span-3`
              : ` lg:h-full lg:col-span-3`
          } h-[290px] w-full pt-16`}
        />
      );
    } else {
      return (
        <Barchart graphClassName={graphClassName} revenueData={revenueData} />
      );
    }
  };
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-3` : ` lg:h-full lg:col-span-3`
      } h-[290px]  
     relative flex items-end justify-start bg-[#0D0D0D] rounded-xl p-6 ${className}`}
    >
      {renderContent()}
      <RevenueHeader date={date} setDate={setDate} />
    </section>
  );
};

export default TotalRevenueBarChart;
