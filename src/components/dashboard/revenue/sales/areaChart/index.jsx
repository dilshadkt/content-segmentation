import React from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomLegend } from "../customeLegend";

const SalesChart = ({ salesData, graphClassName }) => {
  return (
    <div className={`w-full relative h-[190px] ${graphClassName}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salesData}
          margin={{
            left: -52,
            right: -8,
            bottom: -4,
          }}
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A9FFF" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#1A9FFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2ECC71" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#2ECC71" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* Axes */}
          <XAxis
            dataKey="Name "
            tickLine={false}
            axisLine={false}
            tick={false}
          />
          <YAxis tickLine={false} axisLine={false} tick={false} />
          {/* Tooltip and Legend */}
          <Tooltip />
          {/* Areas with Gradient */}
          <Area
            type="monotone"
            dataKey="Last Week"
            stroke="#1A9FFF"
            strokeWidth={2}
            fill="url(#colorLastWeek)"
            dot={true}
          />
          <Area
            type="monotone"
            dataKey="This Week"
            stroke="#2ECC71"
            strokeWidth={2}
            fill="url(#colorThisWeek)"
            dot={true}
          />
          <Legend content={<CustomLegend />} />{" "}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
