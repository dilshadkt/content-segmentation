import React from "react";

const CounterReport = ({ data }) => {
  return (
    <div className="flex  text-xs flex-col gap-y-3">
      <div className="flexBetween">
        <h5 className="text-sm">Counter 1</h5>
        <button>
          <img
            src="/icons/eye.svg"
            alt=""
            className="w-5 hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>
      <div className="flex flex-col gap-y-3 p-4 rounded-lg border border-[#6F57DE]">
        <div className="flexBetween text-sm">
          <span>Total Invoice of the Day</span>
          <span className="text-xs">{data?.TotalInvoice}</span>
        </div>
        <div className="flexBetween">
          <span>Total Amount</span>
          <span className="text-xs">{data?.InvoiceAmount || "---"} AED</span>
        </div>
        <div className="flexBetween">
          <span>Last Invoice Time</span>
          <span className="text-xs">{data?.LastInvoiceTime || "---"}</span>
        </div>
      </div>
    </div>
  );
};

export default CounterReport;
