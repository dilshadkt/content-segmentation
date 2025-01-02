import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";

const data = [
  { name: "Mon", "Last Week": 3004, "This Week": 4504 },
  { name: "Tue", "Last Week": 3650, "This Week": 4400 },
  { name: "Wed", "Last Week": 3500, "This Week": 5100 },
  { name: "Thu", "Last Week": 2800, "This Week": 3800 },
  { name: "Fri", "Last Week": 3200, "This Week": 4200 },
  { name: "Sat", "Last Week": 3100, "This Week": 4600 },
  { name: "Sun", "Last Week": 3800, "This Week": 5200 },
];

const SalesAreaChart = ({ className, graphClassName }) => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:h-full lg:col-span-2 `
      }  h-[290px]  flex items-end justify-start 
    overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4 relative ${className}`}
    >
      {" "}
      {isFullScreenModalOpen && (
        <div className="top-4  right-5 absolute flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}
      <div className={`w-full relative h-[190px] ${graphClassName}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              dataKey="name"
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
      {!isFullScreenModalOpen && (
        <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
          <span className="text-[#9F9C9C] font-semibold">Sales </span>
          <div className="flexEnd gap-x-4">
            <button className="flexStart gap-x-2">
              <span>Select Week</span>
              <img src="/icons/arrowDown.svg" alt="" className="w-2" />
            </button>
            <button
              onClick={() =>
                setFullScreenGraph(
                  <SalesAreaChart
                    className={` w-[96%] md:w-[80%]  h-fit md:h-[65%]`}
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

const CustomLegend = (props) => {
  const { payload } = props; // `payload` contains the legend items
  const { isSideBarOpen } = UseCommon();
  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        listStyle: "none",
        padding: 0,
      }}
      className={` flexCenter relative  -translate-y-4 ${
        isSideBarOpen ? `gap-x-3` : `gap-x-8`
      }  ml-20`}
    >
      {payload.map((entry, index) => (
        <li
          key={`legend-item-${index}`}
          style={{
            marginRight: 20,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: entry.color,
          }}
        >
          {/* Square color indicator */}
          <div className="flexStart gap-x-2">
            <img
              src={`${
                entry.value === "Last Week"
                  ? "/icons/greenSale.svg"
                  : "/icons/blueSale.svg"
              }`}
              alt=""
              className="w-5"
            />
          </div>
          <span className="ml-2 text-xs">
            {entry.value} {/* Legend text */}
          </span>
        </li>
      ))}
      <hr className="absolute left-0 right-3 top-2 mx-auto w-[1px] h-[20px] bg-[#BDC9D3]" />
      <div className="absolute left-0 gap-x-24 right-0 flexCenter text-xs font-light mx-auto top-5 ">
        <span>$3,004</span>
        <span>$3,004</span>
      </div>
    </ul>
  );
};

export default SalesAreaChart;
