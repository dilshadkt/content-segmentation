import React from "react";

const Card = () => {
  return (
    <div
      className="border cursor-pointer flex items-center p-3 py-4 justify-between flex-col 
border-[#6F57DE]/50 hover:border-[#6F57DE] 
bg-[#0D0D0D] rounded-xl shadow-md"
    >
      <h4 className="text-sm text-center">Top Purchasing Products</h4>
      <p className="text-xs text-[#8E8E93] my-3 text-center">
        mostly about buying larger quantities and amounts
      </p>
      <button className="text-xs hover:underline text-[#AFAF06] font-semibold ">
        View Details
      </button>
    </div>
  );
};

export default Card;
