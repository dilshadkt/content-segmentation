import React from "react";

const NoDataLoading = ({ className, isError = false }) => {
  return (
    <div
      className={` bg-[#0D0D0D]    flexCenter
  rounded-xl ${className}`}
    >
      {isError ? (
        "Error occured"
      ) : (
        <img src="/gif/loading.gif" alt="" className="w-20" />
      )}
    </div>
  );
};

export default NoDataLoading;
