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
import DateSelector from "../../../shared/customSelector/index";
import { getTotalRevenue } from "../../../../api/hook";
import NoDataLoading from "../../../shared/loader";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

const TotalRevenueBarChart = ({ className, graphClassName }) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Monday of the current week

  const [date, setDate] = useState({
    from: startOfWeek.toISOString().split("T")[0],
    to: getFormattedDate(0),
  });

  const { data, isLoading } = getTotalRevenue(date);
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();
  if (isLoading)
    return <NoDataLoading className={"col-span-1 lg:col-span-3"} />;
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-3` : ` lg:h-full lg:col-span-3`
      } min-h-[290px]  
     relative flex items-end justify-start bg-[#0D0D0D] rounded-xl p-6 ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="w-full absolute top-4 right-5 flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}
      <div className={` h-[190px] w-full ${graphClassName}`}>
        <ResponsiveContainer height="100%">
          <BarChart
            data={data}
            margin={{
              left: -22,
              bottom: -12,
            }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <CartesianGrid vertical={false} horizontal stroke="#1B1B1B" />
            {/* <Tooltip /> */}
            <Legend content={<CustomLegend />} />{" "}
            <Bar dataKey="expense" fill="#6F57DE" barSize={10} />
            <Bar dataKey="seles" fill="#4A6DA7" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!isFullScreenModalOpen && (
        <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
          <span className="text-[#9F9C9C] font-semibold">Total Revenue</span>
          <div className="flexEnd gap-x-4">
            <DateSelector
              setDate={setDate}
              initialDate={date}
              dateOption={["This Week", "Previous Week", "Custom"]}
            />
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TotalRevenueBarChart
                    className={" w-[96%] md:w-full h-fit   md:h-full"}
                    graphClassName={" h-[230px] md:h-[400px]"}
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

  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        listStyle: "none",
        padding: 0,
      }}
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
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: entry.color,
              borderRadius: "100%",
              marginRight: 8,
            }}
          ></div>
          {entry.value} {/* Legend text */}
        </li>
      ))}
    </ul>
  );
};

export default TotalRevenueBarChart;
