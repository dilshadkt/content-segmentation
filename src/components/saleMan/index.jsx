import React, { useState } from "react";
import { UseCommon } from "../../hooks/UseCommon";
import OverAllPerfomance from "./overAllPerformance";
import TeamPerformance from "./teamPerformance";
import WeekPerformance from "./weekPerformance";
import Perfomance from "./performance";
import TargetArchived from "./targetArchived";
import CloseIcon from "@mui/icons-material/Close";
import { getFormattedDate } from "../../lib/GetFormatedDate";
import DateSelector from "../../components/shared/datePicker";
import TeamPerformanceChart from "./teamPerformance/barChart";

const SalesReports = ({ initialDate }) => {
  const {
    isSideBarOpen,
    setFullScreenModalOpen,
    isFullScreenModalOpen,
    setGraph,
  } = UseCommon();
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [date, setDate] = useState({
    from: initialDate?.from || startOfMonth.toISOString().split("T")[0],
    to: initialDate?.to || getFormattedDate(0),
  });

  const sampleData = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    value: Math.floor(Math.random() * 3000) + 100,
  }));

  return (
    <section
      className={`w-full font-radio overflow-y-auto  gap-x-3 h-full grid ${
        isSideBarOpen
          ? `grid-cols-1  lg:grid-cols-5 2xl:grid-cols-4`
          : `  lg:grid-cols-4`
      }  `}
    >
      <div
        className={` col-span-1  lg:col-span-3 gap-3 grid ${
          isSideBarOpen ? ` 2xl:grid-cols-2` : `xl:grid-cols-2`
        }  `}
      >
        <div className="md:h-[380px]  overflow-hidden">
          <TeamPerformance className={"h-full"} />
        </div>
        <div className="md:h-[380px]">
          <OverAllPerfomance className={"h-full"} />
        </div>
        <div
          className={`w-full  ${
            isSideBarOpen ? `2xl:col-span-2` : ` col-span-2`
          } min-h-[380px] bg-[#0D0D0D]
           gap-3   flex flex-col     p-4 rounded-lg`}
        >
          <div className="flexBetween  ">
            <div className="flexStart gap-x-4">
              <h4 className=" text-lg">Total Collected Amount</h4>
              <span>20,000 AED</span>
            </div>
            <div className="flexEnd gap-x-4">
              <DateSelector
                setDate={setDate}
                initialDate={date}
                dateOption={["This Month", "Previous Month", "Custom"]}
              />
              {!isFullScreenModalOpen ? (
                <button
                  onClick={() => {
                    setFullScreenModalOpen(true);
                    setGraph(
                      <SalesReports
                        className={" w-[96%]  md:w-[80%]  h-fit md:h-[65%]"}
                        graphClassName={" h-[250px] md:h-[400px]"}
                        initialDate={date}
                      />
                    );
                  }}
                >
                  <img src="/icons/fullView.svg" alt="" className="w-3" />
                </button>
              ) : (
                <button onClick={() => setFullScreenModalOpen(false)}>
                  <CloseIcon className="text-white/45" />
                </button>
              )}
            </div>
          </div>
          <span className="text-sm font-light  text-[#898384] -translate-y-3 ">
            Displaying the selected time period for the daily sales graph.
          </span>
          <TeamPerformanceChart data={sampleData} />
        </div>
      </div>
      <TargetArchived />
    </section>
  );
};

export default SalesReports;
