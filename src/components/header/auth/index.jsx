import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const AuthHeader = () => {
  return (
    <nav className="h-[76px] relative z-30 flexBetween px-10 ">
      <div
        className="w-[45px] flexCenter aspect-square text-[10px] text-white rounded-lg bg-gradient-to-r 
from-[#8909C8] to-[#361DA7]"
      >
        FORZA
      </div>
      <button className="text-gray-600 hover:text-white transition-all duration-300">
        <WbSunnyIcon />
      </button>
    </nav>
  );
};

export default AuthHeader;
