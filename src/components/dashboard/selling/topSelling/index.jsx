import React, { useState } from "react";
import { useQuery } from "react-query";
import { topSellingDepartment } from "../../../../api/dashbaord";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import NoDataLoading from "../../../shared/loading";
import SellingGraph from "./graph";
import TopSellingDepartmentHeader from "./header";

const TopSelling = ({ className, initialDate }) => {
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });
  const { data, isLoading, isError } = useQuery(
    ["topSellingDepartment", date],
    () => topSellingDepartment(date),
    {
      select: (data) => data?.data?.salesData,
    }
  );
  if (isLoading || isError) {
    return <NoDataLoading isError={isError} className={`h-full`} />;
  }
  const noData = data?.length > 0;
  const renderContent = () => {
    if (!noData) {
      return <NoDataLoading noData={!noData} className={`h-full`} />;
    } else {
      return <SellingGraph data={data} />;
    }
  };
  return (
    <section
      className={` flex felx-col  bg-[#0D0D0D] h-full  relative rounded-xl ${className}`}
    >
      {renderContent()}
      <TopSellingDepartmentHeader date={date} setDate={setDate} />
    </section>
  );
};

export default TopSelling;
