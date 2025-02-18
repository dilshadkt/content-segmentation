import React from "react";

const LanguagePicker = () => {
  return (
    <div className="hidden md:flexCenter gap-x-3 h-full w-full">
      <div className="w-5 rounded-full  overflow-hidden aspect-square ">
        <img
          src="/image/flag.svg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-[#726C6C] font-semibold hidden md:block">
        Eng(US)
      </span>
      <button className="ml-2">
        <img src="/icons/arrowDown.svg" alt="" className="w-3" />
      </button>
    </div>
  );
};

export default LanguagePicker;
