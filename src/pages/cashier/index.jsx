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
            <div className="flex flex-col mt-5 gap-y-3">
              <h1 className="text-2xl">Cashier Reports</h1>
              <p className="text-sm font-light text-[#FAFAFA] mt-5">
                Cashier Name
              </p>
              <button className="flexStart text-xl font-semibold text-[#A4F4E7] gap-x-2">
                {item?.employeeName} <img src="/icons/arrowDown.svg" alt="" />
              </button>
              <p className="text-sm font-light mt-5 text-[#FAFAFA]">
                Opening Balance
              </p>
              <span className="text-3xl font-semibold">
                {item?.totalAmount} INR
              </span>
            </div>
          </div>
          <div className="rounded-lg">
            <CashierPerformance
              className={"h-full"}
              data={item?.paymentCollection}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default CashierReport;
