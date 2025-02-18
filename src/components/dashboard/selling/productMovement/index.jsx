import React, { useState } from "react";

import { UseCommon } from "../../../../hooks/UseCommon";
import { useQuery } from "react-query";
import { productMovement } from "../../../../api/dashbaord";
import NoDataLoading from "../../../shared/loading";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import MovementHeader from "./header";
import MovementGraph from "./movementGraph";

const ProductMovement = ({ className, graphClassName, initialDate }) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(dayOfWeek),
    to: initialDate?.to || getFormattedDate(0),
  });
  const { isSideBarOpen } = UseCommon();
  const { data, isLoading, isError } = useQuery(
    ["productMovement", date],
    () => productMovement(date),
    {
      select: (data) => data?.data?.salesData,
    }
  );
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`${
          isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
        }`}
      />
    );
  }
  const noData = data?.length > 0;
  const renderContent = () => {
    if (!noData) {
      return (
        <NoDataLoading
          noData={!noData}
          className={`${
            isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
          } h-full`}
        />
      );
    } else {
      return <MovementGraph data={data} />;
    }
  };

  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col   rounded-xl p-6 relative ${className}`}
    >
      {renderContent()}
      <MovementHeader date={date} setDate={setDate} />
    </section>
  );
};

export default ProductMovement;
