import React from "react";
import { FaArrowRight } from "react-icons/fa";
import DepartmentReportGrpah from "../../components/department/departmentReport";
import BubbleChart from "../../components/department/reportBubbleChart";

const DepartmentReport = () => {
  return (
    <section className="w-full h-full  flex flex-col overflow-y-auto">
      <div className="w-full grid grid-cols-4 gap-3">
        <button
          className="flexCenter gap-x-2 bg-[#0D0D0D] hover:text-white hover:bg-[#9F9C9C] rounded-lg 
        py-3"
        >
          <span>Department</span>
          <button className="font-thin">
            <FaArrowRight className="text-sm" />
          </button>
        </button>
        <button
          className="flexCenter gap-x-2 bg-[#0D0D0D] hover:text-white hover:bg-[#9F9C9C] text-[#F77300] rounded-lg 
        py-3"
        >
          <span>Category</span>
          <button className="font-thin">
            <FaArrowRight className="text-sm" />
          </button>
        </button>
        <button
          className="flexCenter gap-x-2 bg-[#0D0D0D] hover:text-white
          text-[#F70031] hover:bg-[#9F9C9C] rounded-lg 
        py-3"
        >
          <span>Sub Categories</span>
          <button className="font-thin">
            <FaArrowRight className="text-sm" />
          </button>
        </button>
        <button
          className="flexCenter gap-x-2 bg-[#0D0D0D] hover:text-white hover:bg-[#9F9C9C] rounded-lg 
        py-3 text-[#E622FF]"
        >
          <span>Department</span>
          <button className="font-thin">
            <FaArrowRight className="text-sm" />
          </button>
        </button>
      </div>
      <div className="h-full  mt-4 overflow-y-auto gap-3 grid grid-cols-2">
        <div className=" md:h-[380px] grid grid-cols-2 gap-3">
          {new Array(6).fill(" ").map((item, index) => (
            <div
              key={index}
              className="h-[120px] relative border
                flexStart p-4 border-[#383838] hover:border-[#6f6e6e]
                hover:shadow-lg hover:shadow-[#6f6e6e]/20 cursor-pointer rounded-lg"
            >
              <div className="flex flex-col gap-y-2">
                <h5 className=" text-sm text-[#737791]">
                  Top Sales in Each Category{" "}
                </h5>
                <span>30000.000 AED</span>
              </div>
              <span className="flexCenter gap-x-1  text-[10px] absolute right-4 bottom-4">
                10%
                <img src="/icons/growWhite.svg" alt="" className="w-2" />
              </span>
            </div>
          ))}
        </div>
        <div className="md:h-[380px] bg-[#0D0D0D]">
          <DepartmentReportGrpah />
        </div>
        <div className="md:h-[380px] bg-[#0D0D0D] rounded-lg overflow-hidden">
          <BubbleChart />
        </div>
        <div className=" md:h-[380px] grid grid-cols-3 gap-3">
          {new Array(6).fill(" ").map((item, index) => (
            <div
              key={index}
              className={`h-full relative border
                flexStart p-4  ${
                  index > 2
                    ? `border-[#1A9FFF]/60 text-[#1A9FFF] hover:border-[#1A9FFF] hover:shadow-[#1A9FFF]/20`
                    : `border-[#31D7DD]/60 text-[#31D7DD] hover:border-[#31D7DD] hover:shadow-[#31D7DD]/20`
                } 
                hover:shadow-md  cursor-pointer rounded-lg`}
            >
              <div className="flex flex-col h-full justify-between">
                <span className="text-sm">Inventory</span>
                <span>30000.000 AED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentReport;
