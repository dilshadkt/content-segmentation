import React from "react";

const FilterHeader = () => {
  return (
    <div className="flexCenter gap-x-4">
      <h3>Stock Overview</h3>
      <button className="flexStart gap-x-2">
        <span>All</span>
        <img src="/icons/arrowDown.svg" alt="" className="w-3" />
      </button>
    </div>
  );
};

export default FilterHeader;
