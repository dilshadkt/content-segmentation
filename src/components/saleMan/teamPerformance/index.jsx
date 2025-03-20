import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { UseCommon } from "../../../hooks/UseCommon";

const data = [
  {
    name: "Week 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Week 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Week 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Week 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Week 5",
    uv: 1890,
    pv: 6000,
    amt: 2181,
  },
  {
    name: "Week 6",
    uv: 2390,
    pv: 9400,
    amt: 2500,
  },
  {
    name: "Week 7",
    uv: 3490,
    pv: 7800,
    amt: 2100,
  },
];

const COLORS = ["#EDA145", "#00C7BE", "#FFCC00"];

const TeamPerformance = ({ className, graphClassName }) => {
  const { isSideBarOpen, isFullScreenModalOpen, setFullScreenModalOpen } =
    UseCommon();
  const exData = [10, 20, 30, 40, 50];
  const allPoints = exData.map((value, index) => index * 50);
  const visiblePoints = allPoints.filter((point) => point !== 0);
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col 
        shadow-2xl shadow-slate-700/20 h-full rounded-xl p-3 md:p-6 relative ${className}`}
    >
      {/* header part  */}
      <div className=" flexBetween     w-full ">
        <span className="text-[#9F9C9C] md:text-lg font-medium">
          Team Performance
        </span>
        <ul className="flexEnd text-xs md:text-sm text-[#9F9C9C] gap-x-2">
          <li className="cursor-pointer hover:text-[#50AAFF]">Day</li>
          <li className="cursor-pointer hover:text-[#50AAFF]">Week</li>
          <li className="cursor-pointer hover:text-[#50AAFF]">Month</li>
        </ul>
      </div>
      {/* graph part  */}
      <div
        className={`relative flex flex-col  mt-7  h-[340px]   md:h-[80%] gap-y-2 `}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="4 3"
              stroke="#FAFAFA"
              horizontalPoints={visiblePoints}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={10}
              tick={{ fill: "#FAFAFA", dy: 20 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={10}
              tick={{
                fill: "#FAFAFA",
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#F9F960"
              dot={false}
              strokeWidth={2.4}
              activeDot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TeamPerformance;
