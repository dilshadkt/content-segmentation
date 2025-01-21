import React from "react";

const InventoryOverview = () => {
  return (
    <div className=" md:h-[380px] grid grid-cols-3 gap-3">
      {new Array(6).fill(" ").map((item, index) => (
        <div
          key={index}
          className={`h-full relative border
    flexStart p-4  ${
      index > 2
        ? `border-[#1A9FFF]/60 text-[#1A9FFF] hover:border-[#1A9FFF] hover:shadow-[#1A9FFF]/20`
        : `border-[#31D7DD]/60 text-[#31D7DD] hover:border-[#31D7DD] hover:shadow-[#31D7DD]/20`
    } 
    hover:shadow-md  cursor-pointer rounded-lg`}
        >
          <div className="flex flex-col h-full justify-between">
            <span className="text-sm">Inventory</span>
            <span>30000.000 AED</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryOverview;
