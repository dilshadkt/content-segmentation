import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BubbleChart = () => {
  const data = [
    { category: "Electronics", x: 260, y: 400, z: 900 },
    { category: "Vegetables", x: 200, y: 600, z: 600 },
    { category: "Fancy", x: 500, y: 700, z: 400 },
  ];

  const categories = {
    Electronics: { color: "#6366f1" },
    Vegetables: { color: "#a3a364" },
    Fancy: { color: "#c97d63" },
  };

  return (
    <div className="w-full h-[400px] bg-[#0D0D0D] p-4 rounded-lg">
      <div className="flex pl-7 gap-7 mb-4">
        {Object.entries(categories).map(([category, { color }]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-300 text-sm">{category}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -15 }}>
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke="#ccc"
            strokeDasharray="5 3"
          />
          <XAxis type="number" dataKey="x" hide={true} />
          <YAxis
            type="number"
            dataKey="y"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <ZAxis type="number" dataKey="z" range={[100, 12000]} />
          <Tooltip
            cursor={false}
            content={({ payload }) => {
              if (!payload || !payload.length) return null;
              const { category } = payload[0].payload;
              return (
                <div className="bg-gray-800 p-2 rounded border border-gray-700">
                  <p className="text-gray-200">{category}</p>
                </div>
              );
            }}
          />
          {Object.entries(categories).map(([category, { color }]) => (
            <Scatter
              key={category}
              name={category}
              data={data.filter((item) => item.category === category)}
              fill={color}
              fillOpacity={0.6}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BubbleChart;
