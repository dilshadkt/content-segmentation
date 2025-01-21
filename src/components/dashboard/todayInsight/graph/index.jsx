import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { insightGraph } from "../../../../api/dashbaord";
import NoDataLoading from "../../../shared/loading";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import DateSelector from "../../../shared/datePicker";

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
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });
  const [hoveredLine, setHoveredLine] = useState(null);
  const { setFullScreenModalOpen, isFullScreenModalOpen, setGraph } =
    UseCommon();
  const { data, isLoading, isError } = useQuery(
    ["insightGraph", date],
    () => insightGraph(date),
    {
      select: (data) =>
        data?.data?.insight?.map((item) => ({
          ...item,
          Date: item?.Date?.split("/")[0],
        })),
    }
  );
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className="h-[290px] col-span-1 lg:col-span-2"
      />
    );
  }

  return (
    <section
      className={`h-[290px] lg:h-full relative col-span-1 lg:col-span-2 flex items-end 
      justify-start bg-[#0D0D0D] rounded-xl p-6  z-0 ${className}`}
    >
      <div className={`h-[190px] w-full ${graphClassName}`}>
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
              tickLine={false}
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

      {/* header  part  */}
      <div className="absolute top-4  flexBetween  left-0 pl-5 2xl:pl-14 pr-5 right-0 w-full ">
        <div className="flexStart gap-x-2">
          <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
            <div className="w-[6px] h-[6px] rounded-full bg-[#1A9FFF]"></div>
            <span className="font-light text-xs 2xl:text-sm text-[#898384]">
              Revenue
            </span>
          </div>
          <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
            <div className="w-[6px] h-[6px] rounded-full bg-[#6F57DE]"></div>
            <span className="font-light text-xs 2xl:text-sm text-[#898384]">
              Profilt
            </span>
          </div>
          <div className="bg-[#313131] flexStart gap-x-2  px-3 rounded-sm">
            <div className="w-[6px] h-[6px] rounded-full bg-[#1A9FFF]"></div>
            <span className="font-light text-xs 2xl:text-sm text-[#898384]">
              Revenue
            </span>
          </div>
        </div>
        <div className="flexEnd gap-x-4">
          <DateSelector setDate={setDate} initialDate={date} />
          {!isFullScreenModalOpen ? (
            <button
              onClick={() => {
                setFullScreenModalOpen(true);
                setGraph(
                  <TodayInsightGraph
                    className={" w-[96%]  md:w-[80%]  h-fit md:h-[65%]"}
                    graphClassName={" h-[250px] md:h-[400px]"}
                    initialDate={date}
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
    </section>
  );
};

export default TodayInsightGraph;
