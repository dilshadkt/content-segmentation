import React from "react";
import clsx from "clsx";

const Shimmer = ({ className }) => {
  return (
    <div
      className={clsx(
        `relative  rounded-xl backdrop-blur-md overflow-hidden`,
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent animate-[shimmer_1.5s_infinite]"></div>
    </div>
  );
};

export default Shimmer;
