import React from "react";
import RecentSupplier from "./overview";
import RecentSupplierList from "./recentSupplierList";
import { UseCommon } from "../../hooks/UseCommon";

const InventoryReports = () => {
  const { isSideBarOpen } = UseCommon();

  return (
    <section
      className={`w-full font-radio overflow-y-auto  gap-x-3 h-full grid ${
        isSideBarOpen
          ? `grid-cols-1  lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4`
          : `  lg:grid-cols-1 xl:grid-cols-4`
      }  `}
    >
      <RecentSupplier />
      <RecentSupplierList />
    </section>
  );
};

export default InventoryReports;
