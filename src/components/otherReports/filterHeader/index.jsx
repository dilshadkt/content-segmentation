import React from "react";
import SalesTransaction from "../salesTransaction";
import StatCard from "../statCard";
const FilterHeader = ({ stats }) => {
  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <SalesTransaction />
    </>
  );
};

export default FilterHeader;
