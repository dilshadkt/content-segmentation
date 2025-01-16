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
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { totalRevenue } from "../../../../api/dashbaord";

const data = [
  { name: "Monday", Expense: 14000, Sales: 12000 },
  { name: "Tuesday", Expense: 16000, Sales: 18000 },
  { name: "Wednesday", Expense: 19000, Sales: 21000 },
  { name: "Thursday", Expense: 12000, Sales: 16000 },
  { name: "Friday", Expense: 15000, Sales: 13000 },
  { name: "Saturday", Expense: 12000, Sales: 15000 },
  { name: "Sunday", Expense: 18000, Sales: 20000 },
];

const TotalRevenueBarChart = ({ className, graphClassName }) => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();

  const { isLoading, data: revenue } = useQuery("totalRevenue", totalRevenue);
  const revenueData = revenue?.data?.revenue;
  console.log(revenueData);
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-3` : ` lg:h-full lg:col-span-3`
      } h-[290px]  
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
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <CartesianGrid vertical={false} horizontal stroke="#1B1B1B" />
            {/* <Tooltip /> */}
            <Legend content={<CustomLegend />} />{" "}
            <Bar dataKey="Expense" fill="#6F57DE" barSize={10} />
            <Bar dataKey="Sales" fill="#4A6DA7" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!isFullScreenModalOpen && (
        <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
          <span className="text-[#9F9C9C] font-semibold">Total Revenue</span>
          <div className="flexEnd gap-x-4">
            <button className="flexStart gap-x-2">
              <span>Week</span>
              <img src="/icons/arrowDown.svg" alt="" className="w-2" />
            </button>
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
