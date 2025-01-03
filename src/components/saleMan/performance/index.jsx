import React from "react";

const Perfomance = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full max-h-[460px] overflow-y-auto">
      {new Array(4).fill(" ").map((item, index) => (
        <div
          key={index}
          className="min-h-[100px] rounded-lg flexStart border-2 relative
       border-[#CC83F0]/30 hover:border-[#CC83F0]/60 hover:shadow-lg
        hover:shadow-[#CC83F0]/10 pl-4"
        >
          <div className="flex flex-col">
            <span className="text-sm text-[#9F9C9C] ">
              Top Performing Department
            </span>
            <span>Electronics</span>
          </div>
          <button
            className="absolute top-2 right-3 text-[11px] 
       px-3 py-[6px] flexStart gap-x-1 rounded-lg bg-[#FAFAFA] text-gray-800"
          >
            Month <img src="/icons/arrowDownBlack.svg" alt="" className="w-2" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Perfomance;
