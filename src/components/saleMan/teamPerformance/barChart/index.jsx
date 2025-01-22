import React from "react";
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

const TeamPerformanceChart = ({ data }) => {
  // Custom color function based on value
  const getBarColor = (value) => {
    if (!value) return "#963333"; // Default color for zero/null values
    if (value <= 500) return "#963333"; // Low - Red
    if (value <= 1500) return "#B8936E"; // Average - Beige
    return "#007846"; // High - Green
  };

  // Custom shape component for the bars
  const CustomBar = (props) => {
    const { x, y, width, height, value } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={getBarColor(value)}
          rx={3}
          ry={3}
        />
      </g>
    );
  };

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} horizontal stroke="#1B1B1B" />
          <XAxis
            dataKey="day"
            stroke="#666"
            tick={{ fill: "#666" }}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#666"
            tick={{ fill: "#666" }}
            domain={[0, 5000]}
            ticks={[0, 100, 500, 1000, 2000, 5000]}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#e4dbdb",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <Legend
            wrapperStyle={{
              color: "#474343",
            }}
          />
          <Bar dataKey="value" shape={<CustomBar />} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamPerformanceChart;
