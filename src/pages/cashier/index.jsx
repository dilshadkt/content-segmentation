import React from "react";
import CashierPerformance from "../../components/cahierReport/performance";
import { getCasheirCounter } from "../../api/hook";
import NoDataLoading from "../../components/shared/loader";

const CashierReport = () => {
  const { data, isLoading } = getCasheirCounter();
  if (isLoading)
    return (
      <NoDataLoading
        className={
          "w-full font-radio gap-y-3 flex flex-col h-full overflow-y-auto  "
        }
      />
    );

  return (
    <section className="w-full font-radio gap-y-3 flex flex-col h-full overflow-y-auto  ">
      {data?.map((item, index) => (
        <div key={index} className=" grid lg:grid-cols-2 gap-3">
          <div className="bg-[#0D0D0D] p-5 rounded-lg flex flex-col">
            <span className="text-2xl font-semibold">{item?.counter}</span>
            <div className="flex flex-col mt-5 gap-y-3">
              <p className="text-sm font-light text-[#FAFAFA]">Cashier Name</p>
              <button className="flexStart text-lg text-[#A4F4E7] gap-x-2">
                {item?.name} <img src="/icons/arrowDown.svg" alt="" />
              </button>
              <p className="text-sm font-light text-[#FAFAFA]">
                Opening Balance
              </p>
              <span className="text-xl font-semibold">
                {item?.openingBalence} INR
              </span>
              <p className="text-sm font-light text-[#FAFAFA]">Shift Timing</p>
              <div className="flexBetween text-lg">
                <h5 className="">In</h5>
                <span className="font-light text-gray-400 text-base">
                  {item?.shiftTiming?.in}
                </span>
              </div>
              <div className="flexBetween text-lg ">
                <h5>Out</h5>
                <span className="font-light text-base text-gray-400">
                  {item?.shiftTiming?.out}
                </span>
              </div>
              <h4 className="mt-2 text-lg">Closing Balance</h4>
              <p className="text-sm font-light text-[#FAFAFA]">
                {item?.closingBalence} INR
              </p>
            </div>
          </div>
          <div className="rounded-lg">
            <CashierPerformance className={"h-full"} data={item?.collection} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default CashierReport;
