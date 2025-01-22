import React from "react";
import { UseCommon } from "../../../../../hooks/UseCommon";

const TargetBarchart = ({ data }) => {
  const { isFullScreenModalOpen } = UseCommon();
  return (
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
  );
};

export default TargetBarchart;
