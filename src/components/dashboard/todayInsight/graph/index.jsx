import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { insightGraph } from "../../../../api/dashbaord";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import NoDataLoading from "../../../shared/loading";
import InsightGraphHeader from "./header";
import { useParams } from "react-router-dom";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div
        style={{
          color: "#FFFFFF",
        }}
        className="-translate-x-8"
      >
        {payload.map((item, index) => (
          <div
            key={index}
            className={`${
              item.dataKey === "revenue"
                ? `translate-x-8`
                : item.dataKey === "profit"
                ? `-translate-x-16 -translate-y-4`
                : `-translate-y-16`
            } bg-[#3F3D5A] my-1 rounded-full px-2`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div style={{ fontSize: "10px" }} className="flexStart gap-x-1">
              <div
                style={{ backgroundColor: item.color }}
                className="w-[6px] h-[6px] rounded-full"
              ></div>
              {item.value} AED
            </div>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const TodayInsightGraph = ({
  className = "",
  graphClassName = "",
  initialDate,
}) => {
  const today = new Date();
  const { branchName } = useParams();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2);
  const [date, setDate] = useState({
    from: initialDate?.from || startOfMonth.toISOString().split("T")[0],
    to: initialDate?.to || getFormattedDate(0),
  });
  const [hoveredLine, setHoveredLine] = useState(null);

  const { data, isLoading, isError } = useQuery(
    ["insightGraph", date, branchName],
    () => insightGraph(date),
    {
      select: (data) =>
        data?.data?.insight?.map((item) => ({
          ...item,
          Date: item?.Date?.split("/")[0],
        })),
    }
  );

  // Calculate Y-axis ticks based on data
  const calculateYAxisTicks = (data) => {
    const maxValue = Math.max(
      ...data?.map((item) =>
        Math.max(item.Revenue || 0, item.Profit || 0, item.Expenses || 0)
      )
    );

    if (maxValue === 0) return [0];

    const step = maxValue / 5;
    return Array.from({ length: 6 }, (_, i) => Number((i * step).toFixed(2)));
  };

  // Format large numbers
  const formatYAxis = (value) => {
    // if (value >= 1000) {
    //   return `${(value / 1000).toFixed(1)}k`;
    // }
    return value.toFixed(0);
  };

  const noData = data?.every(
    (item) => item.Revenue === 0 && item.Profit === 0 && item.Expenses === 0
  );

  if (isLoading || isError) {
    return (
      <NoDataLoading
        noData={noData}
        className="h-[290px] col-span-1 lg:col-span-2"
      />
    );
  }
  const yAxisTicks = calculateYAxisTicks(data);
  const renderContent = () => {
    if (noData) {
      return (
        <NoDataLoading
          noData={noData}
          className="h-full col-span-1 pt-6 lg:col-span-2"
        />
      );
    } else {
      return (
        <div className={`h-[190px] relative z-10 w-full ${graphClassName}`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                left: -22,
                bottom: -12,
              }}
            >
              <XAxis
                fontSize={12}
                dataKey="Date"
                stroke="#59588D"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="number"
                fontSize={12}
                domain={[0, "dataMax"]}
                stroke="#59588D"
                axisLine={false}
                ticks={yAxisTicks}
                tickLine={false}
                tickFormatter={formatYAxis}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#3D26A3",
                  strokeWidth: 60,
                  strokeOpacity: 0.2,
                }}
              />

              {/* Revenue Line */}
              <Line
                type="monotone"
                dataKey="Revenue"
                stroke="#4229B4"
                strokeWidth={hoveredLine === "revenue" ? 3 : 1.4}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#FFD9FA",
                  stroke: "#FFF2FE",
                  strokeOpacity: "0.3",
                  strokeWidth: 12,
                }}
                onMouseEnter={() => setHoveredLine("revenue")}
                onMouseLeave={() => setHoveredLine(null)}
              />

              {/* Profit Line */}
              <Line
                type="monotone"
                dataKey="Profit"
                stroke="#8C22C0"
                strokeWidth={hoveredLine === "profit" ? 3 : 1.4}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#FFD9FA",
                  stroke: "#FFF2FE",
                  strokeOpacity: "0.3",
                  strokeWidth: 12,
                }}
                onMouseEnter={() => setHoveredLine("profit")}
                onMouseLeave={() => setHoveredLine(null)}
              />

              {/* Expenses Line */}
              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="#0B8C04"
                strokeWidth={hoveredLine === "expenses" ? 3 : 1.4}
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#FFD9FA",
                  stroke: "#FFF2FE",
                  strokeOpacity: "0.3",
                  strokeWidth: 12,
                }}
                onMouseEnter={() => setHoveredLine("expenses")}
                onMouseLeave={() => setHoveredLine(null)}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  return (
    <section
      className={`h-[290px] lg:h-full relative col-span-1 lg:col-span-2 flex items-end 
      justify-start bg-[#0D0D0D] rounded-xl p-6  z-10 ${className}`}
    >
      {renderContent()}
      {/* header  part  */}
      <InsightGraphHeader date={date} setDate={setDate} />
    </section>
  );
};

export default TodayInsightGraph;
