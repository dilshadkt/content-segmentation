import React from "react";
import CashierPerformance from "./performance";
import Report from "./report";

const CashierReports = () => {
  return (
    <section className="w-full font-radio gap-y-3 flex flex-col h-full overflow-y-auto  ">
      <div className=" grid lg:grid-cols-2 gap-3">
        <Report />
        <div className="rounded-lg">
          <CashierPerformance
            innerRadius={58}
            outerRadius={95}
            className={"h-full"}
            listClassName={" xl:grid-cols-2"}
          />{" "}
        </div>
      </div>
      <div className=" grid lg:grid-cols-2 gap-3">
        <Report />
        <div className="rounded-lg">
          <CashierPerformance
            innerRadius={58}
            outerRadius={95}
            className={"h-full"}
            listClassName={" xl:grid-cols-2"}
          />{" "}
        </div>
      </div>
    </section>
  );
};

export default CashierReports;
