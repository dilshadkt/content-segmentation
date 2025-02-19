import React, { useState } from "react";
import { useQuery } from "react-query";
import { targetVsReality } from "../../../../api/dashbaord";
import { UseCommon } from "../../../../hooks/UseCommon";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import NoDataLoading from "../../../shared/loading";
import TargetBarchart from "./barchart";
import TargetHeader from "./header";

const TargetVsReality = ({ className, graphClassName, initialDate }) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 2);

  const [date, setDate] = useState({
    from: initialDate?.from || startOfYear.toISOString().split("T")[0],
    to: initialDate?.to || getFormattedDate(0),
  });
  const { data, isLoading, isError } = useQuery(
    ["targetVsReality", date],
    () => targetVsReality(date),
    {
      select: (data) => data?.data?.salesData,
    }
  );
  const noData = data?.every(
    (item) => item?.["Target Sales"] === 0 && item?.["Reality Sales"] === 0
  );
  const { isSideBarOpen } = UseCommon();
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : ` lg:h-full lg:col-span-2`
        } h-[290px]  `}
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
              : ` lg:h-full lg:col-span-2`
          } h-[290px]  `}
        />
      );
    } else {
      return <TargetBarchart data={data} graphClassName={graphClassName} />;
    }
  };
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : ` lg:h-full lg:col-span-2`
      } h-[290px]  
     bg-[#0D0D0D] relative flex flex-col  rounded-xl ${className}`}
    >
      {renderContent()}
      <TargetHeader date={date} setDate={setDate} />
    </section>
  );
};

export default TargetVsReality;
