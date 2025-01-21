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
import { useQuery } from "react-query";
import { targetVsReality } from "../../../../api/dashbaord";
import NoDataLoading from "../../../shared/loading";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import DateSelector from "../../../shared/datePicker";

const TargetVsReality = ({ className, graphClassName, initialDate }) => {
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });
  const { data, isLoading, isError } = useQuery(
    ["targetVsReality", date],
    () => targetVsReality(date),
    {
      select: (data) => data?.data?.salesData,
    }
  );
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    setFullScreenGraph,
  } = UseCommon();
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : ` lg:h-full lg:col-span-2`
        } h-[290px]  `}
      />
    );
  }
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
                dataKey="Name"
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
                dataKey="Reality Sales"
                fill="#34C759"
                barSize={12}
                radius={[3, 3, 3, 3]}
              />
              <Bar
                dataKey="Target Sales"
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

      <div className="absolute top-4  flexBetween  left-0 pl-4 pr-5 right-0 w-full ">
        <span className="text-[#9F9C9C] text-sm font-semibold">
          Target Vs Reality{" "}
        </span>
        <div className="flexEnd gap-x-3">
          <DateSelector setDate={setDate} initialDate={date} />
          {!isFullScreenModalOpen ? (
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TargetVsReality
                    className={` w-[96%] md:w-[60%] h-fit md:h-[65%] px-7`}
                    graphClassName={` h-[230px] md:h-[400px]`}
                    initialDate={date}
                  />
                )
              }
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
    </section>
  );
};

export default TargetVsReality;
