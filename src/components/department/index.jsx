import React from "react";
import { FaArrowRight } from "react-icons/fa";
import DepartmentReportGrpah from "./departmentReport";
import BubbleChart from "./reportBubbleChart";
import FilterHeader from "./header";
import DepartmentOverview from "./departmentOverview";
import InventoryOverview from "./inventoryOverview";

const DepartmentReports = () => {
  return (
    <section className="w-full h-full  flex flex-col overflow-y-auto">
      <FilterHeader />
      <div className="h-full  mt-4 overflow-y-auto gap-3 grid grid-cols-2">
        <DepartmentOverview />
        <div className="md:h-[380px] bg-[#0D0D0D]">
          <DepartmentReportGrpah />
        </div>
        <div className="md:h-[380px] bg-[#0D0D0D] rounded-lg overflow-hidden">
          <BubbleChart />
        </div>
        <InventoryOverview />
      </div>
    </section>
  );
};

export default DepartmentReports;
