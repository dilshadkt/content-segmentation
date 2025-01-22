import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import { UseCommon } from "../../../../../hooks/UseCommon";
const MovementGraph = ({ data }) => {
  const { isFullScreenModalOpen } = UseCommon();
  return (
    <div
      className={`relative flex flex-col h-[270px] mb-4 md:h-full gap-y-2 mt-6`}
    >
      <ResponsiveContainer
        width="100%"
        height={isFullScreenModalOpen ? 190 : "100%"}
      >
        <PieChart>
          <Pie
            data={data}
            innerRadius={isFullScreenModalOpen ? 58 : 48}
            outerRadius={isFullScreenModalOpen ? 95 : 85}
            dataKey="Percentage"
            paddingAngle={4}
            stroke="none"
            cornerRadius={7}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
                filter={`drop-shadow(0 0 3px ${COLORS[index]})`}
              >
                <Label
                  value={entry.Percentage.toLocaleString()}
                  position="center"
                  fill="#fff"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 400,
                  }}
                />
              </Cell>
            ))}
            <Label
              value="Total Items"
              position="center"
              style={{
                fontSize: "0.775rem",
                fontWeight: 400,
                fill: "#FFFFFF",
              }}
            />
            <Label
              value={data
                ?.reduce((sum, entry) => sum + entry.Percentage, 0)
                .toLocaleString()}
              position="center"
              dy={20}
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                fill: "#FFFFFF",
              }}
            />
            <LabelList
              dataKey="Percentage"
              position="inside"
              fill="#fff"
              formatter={(value) => `${value.toLocaleString()}%`}
              style={{
                fontSize: "0.65rem",
                fontWeight: 400,
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className=" flexCenter absolute -bottom-4 left-0 right-0 mx-auto gap-x-6">
        {data?.map((item, index) => (
          <div key={index} className="flexStart gap-x-3">
            <div className="w-2 h-2 rounded-full bg-[#6F57DE]"></div>
            <div className="flex flex-col">
              <span className="text-sm">{item?.MovementCategory}</span>
              <span className="text-xs text-[#6F57DE]">{item?.ItemCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovementGraph;
