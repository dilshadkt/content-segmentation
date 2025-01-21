import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { DEPARTMENT_HEADER } from "../../../constants";

const FilterHeader = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-3">
      {DEPARTMENT_HEADER.map((header) => (
        <button
          key={header.id}
          style={{
            color: header.color,
          }}
          className="flexCenter gap-x-2 bg-[#0D0D0D] hover:text-white hover:bg-[#9F9C9C] rounded-lg 
        py-3"
        >
          <span>{header.title}</span>
          <button className="font-thin">
            <FaArrowRight className="text-sm" />
          </button>
        </button>
      ))}
    </div>
  );
};

export default FilterHeader;
