import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { UseCommon } from "../../../../hooks/UseCommon";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import CustomLegend from "../customLegend";
import NoDataLoading from "../../../shared/loading";

const TeamPerformanceChart = ({
  initialDate,
  graphClassName,
  data,
  isLoading,
  isError,
}) => {
  const today = new Date();

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [date, setDate] = useState({
    from: initialDate?.from || startOfMonth.toISOString().split("T")[0],
    to: initialDate?.to || getFormattedDate(0),
  });

  const getBarColor = (value) => {
    if (!value) return "#963333"; // Default color for zero/null values
    if (value <= 500) return "#963333"; // Low - Red
    if (value <= 1500) return "#B8936E"; // Average - Beige
    return "#007846"; // High - Green
  };

  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    setGraph,
  } = UseCommon();
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
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`min-h-full  ${
          isSideBarOpen ? `2xl:col-span-2` : ` col-span-2`
        } `}
      />
    );
  }
  return (
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
          {/* <DateSelector
            setDate={setDate}
            initialDate={date}
            dateOption={["This Month", "Previous Month", "Custom"]}
          /> */}
          {!isFullScreenModalOpen ? (
            <button
              onClick={() => {
                setFullScreenModalOpen(true);
                setGraph(
                  <TeamPerformanceChart
                    className={" w-[96%]  md:w-[80%]  h-fit md:h-[65%]"}
                    graphClassName={" h-[250px] md:h-[400px]"}
                    initialDate={date}
                    data={data}
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
      <div className="h-full min-h-[300px]    flex flex-col relative">
        <div className={`max-h-[340px] h-full ${graphClassName}`}>
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
                dataKey="InvDate"
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
                  color: "#1e1c1c",
                }}
              />

              <Bar dataKey="TotalSales" shape={<CustomBar />} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <CustomLegend />
      </div>
    </div>
  );
};

export default TeamPerformanceChart;
