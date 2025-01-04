import React from "react";
import { UseCommon } from "../../hooks/UseCommon";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import CloseIcon from "@mui/icons-material/Close";
import Perfomance from "../../components/saleMan/performance";

const data = [
  { name: "Moving Items", value: 80 },
  { name: "Slow Moving", value: 20 },
];

const COLORS = ["#FFCC00", "#FFCC0052"];
const InventorytReport = () => {
  const { isSideBarOpen, isFullScreenModalOpen } = UseCommon();
  const stockOverView = [
    {
      id: 1,
      title: "Electronics",
      percentage: 70,
      value: "125131.00",
    },
    {
      id: 2,
      title: "Grocery",
      percentage: 85,
      value: "246521.00",
    },
    {
      id: 3,
      title: "Cloths",
      percentage: 65,
      value: "246521.00",
    },
    {
      id: 4,
      title: "Fancy",
      percentage: 80,
      value: "246521.00",
    },
    {
      id: 5,
      title: "Stationary",
      percentage: 20,
      value: "246521.00",
    },
    {
      id: 6,
      title: "Household",
      percentage: 90,
      value: "246521.00",
    },
  ];
  return (
    <section
      className={`w-full font-radio overflow-y-auto  gap-x-3 h-full grid ${
        isSideBarOpen
          ? `grid-cols-1  lg:grid-cols-5 2xl:grid-cols-4`
          : `  lg:grid-cols-4`
      }  `}
    >
      <div className="col-span-1 md:h-fit  flex flex-col  gap-3 lg:col-span-3  ">
        <div
          className={`  md:h-fit bg-[#0D0D0D] py-5 rounded-lg overflow-hidden w-full `}
        >
          <div className="flexBetween  relative z-50 px-5">
            <h4 className="text-2xl font-light">Stock overview</h4>
            <ul className="flexEnd gap-x-4 text-sm">
              <li className="cursor-pointer hover:text-[#50AAFF]">Day</li>
              <li className="cursor-pointer hover:text-[#50AAFF]">Week</li>
              <li className="cursor-pointer hover:text-[#50AAFF]">Month</li>
            </ul>
          </div>
          <div
            className={`gap-3 grid px-5 ${
              isSideBarOpen ? ` 2xl:grid-cols-3` : `xl:grid-cols-3`
            } `}
          >
            <div className="grid gap-y-10 xl:grid-cols-3 col-span-2  mt-3  py-5">
              <div className="flex flex-col   h-full">
                <h6 className="text-[#B5B3B3]">Current stock value</h6>{" "}
                <span className="text-xl font-semibold mt-2">
                  1281962701.00
                </span>
                <ul className="flex flex-col mt-7 gap-y-6">
                  <li className="flexStart gap-x-2">
                    <div className="w-3  h-3 bg-[#31D7DD] rounded-[3px]"></div>
                    <span className="text-sm font-normal">Good</span>
                  </li>
                  <li className="flexStart gap-x-2">
                    <div className="w-3  h-3 bg-[#B6B926] rounded-[3px]"></div>
                    <span className="text-sm font-normal">Average</span>
                  </li>
                  <li className="flexStart gap-x-2">
                    <div className="w-3  h-3 bg-[#C72639] rounded-[3px]"></div>
                    <span className="text-sm font-normal">Low</span>
                  </li>
                </ul>
              </div>
              <div className="col-span-2   gap-y-3 flex flex-col ">
                {stockOverView.map((item) => (
                  <div key={item.id} className="flex flex-col gap-y-1">
                    <span className="text-sm">{item.title}</span>
                    <div className="flexBetween gap-x-3">
                      <div
                        style={{
                          width: `${item.percentage}%`,
                        }}
                        className="h-3 shadow-md backdrop-blur-lg  bg-[#15B097]/85"
                      ></div>
                      <span className="text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-[380px]  relative flexCenter flex-col">
              <ResponsiveContainer
                width="100%"
                height={isFullScreenModalOpen ? 190 : "100%"}
                className={"-translate-y-8"}
              >
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={isFullScreenModalOpen ? 58 : 48}
                    outerRadius={isFullScreenModalOpen ? 95 : 85}
                    dataKey="value"
                    paddingAngle={4}
                    stroke="none"
                    cornerRadius={7}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index]}
                        filter={`drop-shadow(0 0 3px ${COLORS[index]})`}
                      >
                        <Label
                          value={entry.value.toLocaleString()}
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
                        .reduce((sum, entry) => sum + entry.value, 0)
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
                      dataKey="value"
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
              <button
                className="absolute bottom-12 border border-[#FFCC00]/50
          hover:border-[#FFCC00] hover:shadow-md hover:shadow-[#FFCC00]/20 py-2 rounded-lg px-5 text-sm"
              >
                View By Suppliers
              </button>
            </div>
          </div>
        </div>
        {/* second row  */}
        <div
          className={`
        w-full grid ${
          isSideBarOpen ? `2xl:grid-cols-2` : `grid-cols-2`
        }  gap-3`}
        >
          <div className=" md:h-[380px] grid grid-cols-3 gap-3">
            {new Array(6).fill(" ").map((item, index) => (
              <div
                key={index}
                className={`h-full bg-[#0D0D0D] relative border
                flexStart p-4  ${
                  index > 2
                    ? `border-[#1A9FFF]/60 text-[#1A9FFF] hover:border-[#1A9FFF] hover:shadow-[#1A9FFF]/20`
                    : `border-[#31D7DD]/60 text-[#31D7DD] hover:border-[#31D7DD] hover:shadow-[#31D7DD]/20`
                } 
                hover:shadow-md  cursor-pointer rounded-lg`}
              >
                <div className="flex flex-col h-full justify-between">
                  <span className="text-sm">Inventory</span>
                  <span className="text-xs">30000.000 AED</span>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`md:h-[380px] ${
              isSideBarOpen ? `2xl:overflow-y-auto` : `overflow-y-auto`
            } `}
          >
            <Perfomance />
          </div>
        </div>
      </div>
      <div
        className={`bg-[#0D0D0D] rounded-lg md:overflow-hidden ${
          isSideBarOpen
            ? ` col-span-1 lg:col-span-2 2xl:col-span-1`
            : `col-span-1`
        }  py-5 px-4  flex flex-col `}
      >
        <div className="flexBetween">
          <button className="flexCenter gap-x-2">
            <span>Top</span>
            <img src="/icons/arrowDown.svg" alt="" className="w-3" />
          </button>
          <span>Suppliers List</span>
        </div>
        <div className="flex flex-col gap-y-3 mt-7">
          {new Array(3).fill(" ").map((item, index) => (
            <div
              key={index}
              className="border border-[#6F57DE]/50
              hover:shadow-md hover:shadow-[#6F57DE]/25 cursor-pointer hover:border-[#6F57DE] py-5 flex flex-col gap-y-4 rounded-lg p-3"
            >
              <span>Recent</span>
              <span className="text-sm font-light">Al Marai</span>
              <h5>Bill Amount</h5>
              <span className="font-medium text-lg ">1110.00 AED</span>
              <span className="text-[#F4C790]">Total Amount Pending</span>
              <span>8000.00 AED</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InventorytReport;
