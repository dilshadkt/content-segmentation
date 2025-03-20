import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../shared/customSelector/index";
import { getTargetVsReality } from "../../../../api/hook";
import NoDataLoading from "../../../shared/loader";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

const TargetVsReality = ({ className, graphClassName }) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Monday of the current week

  const [date, setDate] = useState({
    from: startOfWeek.toISOString().split("T")[0],
    to: getFormattedDate(0),
  });

  const { data, isLoading } = getTargetVsReality(date);
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    setFullScreenGraph,
  } = UseCommon();
  if (isLoading)
    return <NoDataLoading className={"col-span-1 lg:col-span-2"} />;
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : ` lg:h-full lg:col-span-2`
      } h-[290px]  
     bg-[#0D0D0D] relative flex flex-col  rounded-xl ${className}`}
    >
      <div className="flex flex-col gap-y-3 h-full mt-12">
        <div
          className={`w-full relative ${
            !isFullScreenModalOpen && "h-[110px]"
          } ${graphClassName}`}
        >
          {isFullScreenModalOpen && (
            <div className="absolute right-0 -top-6  mb-5 flexEnd">
              <button onClick={() => setFullScreenModalOpen(false)}>
                <CloseIcon className="text-white/45" />
              </button>
            </div>
          )}
          <ResponsiveContainer
            width="100%"
            height={!isFullScreenModalOpen ? 110 : "100%"}
          >
            <BarChart
              data={data}
              margin={{
                left: -48,
                right: 7,
                bottom: -12,
              }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={false}
              />
              <CartesianGrid vertical={false} horizontal stroke="#1B1B1B" />
              <Bar
                dataKey="expense"
                fill="#34C759"
                barSize={12}
                radius={[3, 3, 3, 3]}
              />
              <Bar
                dataKey="sales"
                fill="#007AFF"
                barSize={12}
                radius={[3, 3, 3, 3]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-y-3 h-full p-3  ">
          <div className="flexBetween">
            <div className="flexCenter bg-[#1B1B1B] w-8 h-8 rounded-lg">
              <img src="/icons/realitySale.svg" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#8C79E5] font-semibold">
                Reality Sales
              </span>
              <p className="text-xs text-[#9F9C9C]">Global</p>
            </div>
            <span className="text-sm text-[#2CC36B]">10.823</span>
          </div>
          <div className="flexBetween">
            <div className="flexCenter bg-[#1B1B1B] w-8 h-8 rounded-lg">
              <img src="/icons/targetSale.svg" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-[#8C79E5] font-semibold">
                Target Sales
              </span>
              <p className="text-xs text-[#9F9C9C]">Commercial</p>
            </div>
            <span className="text-sm text-[#007AFF]">12.823</span>
          </div>
        </div>
      </div>
      {!isFullScreenModalOpen && (
        <div className="absolute top-4  flexBetween  left-0 pl-4 pr-5 right-0 w-full ">
          <span className="text-[#9F9C9C] text-sm font-semibold">
            Target Vs Reality{" "}
          </span>
          <div className="flexEnd gap-x-3">
            <DateSelector
              setDate={setDate}
              initialDate={date}
              dateOption={["This Month", "Previous Month"]}
            />
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TargetVsReality
                    className={` w-[96%] md:w-[60%] h-fit md:h-[65%] px-7`}
                    graphClassName={` h-[230px] md:h-[400px]`}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="" className="w-3" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TargetVsReality;
