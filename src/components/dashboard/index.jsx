import React from "react";
import { UseCommon } from "../../hooks/UseCommon";

import {
  ProductMovement,
  Sales,
  TargetVsReality,
  TodayInsight,
  TodayInsightGraph,
  TopSelling,
  TopSellingBranches,
  TotalRevenue,
} from "../../components";
const HomeDashboard = () => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    Graph,
  } = UseCommon();
  return (
    <section className="w-full h-full gap-y-4  flex flex-col overflow-y-auto">
      <div className="grid lg:grid-cols-5 gap-y-4 lg:gap-y-0 gap-x-4 lg:min-h-[280px]">
        <TodayInsight />
        <TodayInsightGraph />
      </div>
      <div
        className={` ${
          isSideBarOpen
            ? `  md:grid-cols-2 2xl:grid-cols-7 gap-y-4`
            : `md:grid-cols-2 lg:min-h-[280px] lg:grid-cols-7  lg:gap-y-0`
        } grid  gap-y-4  gap-x-4 `}
      >
        <TotalRevenue />
        <Sales />
        <TargetVsReality />
        <div className="hidden md:block lg:hidden">
          <TopSelling />
        </div>
      </div>
      <div
        className={` ${
          isSideBarOpen
            ? `md:grid-cols-2 2xl:grid-cols-7 gap-y-4`
            : `md:grid-cols-2  lg:grid-cols-7 lg:min-h-[280px] lg:gap-y-0`
        } grid   gap-y-4  gap-x-4 `}
      >
        <div
          className={`${
            isSideBarOpen ? `col-span-1 2xl:col-span-3` : `lg:col-span-3`
          }  md:hidden lg:block `}
        >
          <TopSelling />
        </div>
        <TopSellingBranches />
        <ProductMovement />
      </div>
    </section>
  );
};

export default HomeDashboard;
