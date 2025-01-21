import React from "react";

const SupplierCard = () => {
  return (
    <div
      className="border border-[#6F57DE]/50
hover:shadow-md hover:shadow-[#6F57DE]/25 cursor-pointer hover:border-[#6F57DE] py-5 flex flex-col gap-y-4 rounded-lg p-3"
    >
      <span>Recent</span>
      <span className="text-sm font-light">Al Marai</span>
      <h5>Bill Amount</h5>
      <span className="font-medium text-lg ">1110.00 AED</span>
      <span className="text-[#F4C790]">Total Amount Pending</span>
      <span>8000.00 AED</span>
    </div>
  );
};

export default SupplierCard;
