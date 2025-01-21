import React from "react";
import { UseCommon } from "../../../hooks/UseCommon";
import SupplierCard from "../supplierCard";

const RecentSupplierList = () => {
  const { isSideBarOpen } = UseCommon();

  return (
    <section
      className={`bg-[#0D0D0D]   rounded-lg  ${
        isSideBarOpen
          ? ` col-span-1 lg:col-span-2 2xl:col-span-1 2xl:overflow-y-auto`
          : `col-span-1 xl:overflow-y-auto`
      }  py-5 px-4  flex flex-col `}
    >
      <div className="flexBetween">
        <button className="flexCenter gap-x-2">
          <span>Top</span>
          <img src="/icons/arrowDown.svg" alt="" className="w-3" />
        </button>
        <span>Suppliers List</span>
      </div>
      <div
        className={` ${
          isSideBarOpen ? `2xl:flex 2xl:flex-col` : `xl:flex xl:flex-col`
        } grid grid-cols-1  md:grid-cols-2   gap-3   mt-7`}
      >
        {new Array(3).fill(" ").map((item, index) => (
          <SupplierCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default RecentSupplierList;
