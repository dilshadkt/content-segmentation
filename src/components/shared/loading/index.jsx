import React from "react";

const NoDataLoading = ({ className, isError = false, noData = false }) => {
  const renderStatus = () => {
    if (isError) {
      return "Error Occured";
    } else if (noData) {
      return "There is no enough data";
    } else {
      return <img src="/gif/loading.gif" alt="" className="w-20" />;
    }
  };
  return (
    <div
      className={` bg-[#0D0D0D]  text-sm text-gray-400  w-full  flexCenter
  rounded-xl ${className}`}
    >
      {renderStatus()}
    </div>
  );
};

export default NoDataLoading;
