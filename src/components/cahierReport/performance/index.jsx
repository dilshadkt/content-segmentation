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
import CloseIcon from "@mui/icons-material/Close";
import { UseCommon } from "../../../hooks/UseCommon";

const data = [
  { name: "Moving Items", value: 30 },
  { name: "Slow Moving", value: 20 },
  { name: "Slow Moving", value: 40 },
  { name: "Slow Moving", value: 10 },
];

const COLORS = ["#BC277E", "#00C7BE", "#F68058", "#F8E27F"];

const CashierPerformance = ({ className, graphClassName }) => {
  const { isSideBarOpen, isFullScreenModalOpen, setFullScreenModalOpen } =
    UseCommon();
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col  shadow-2xl shadow-slate-700/20
         rounded-xl p-6 relative ${className}`}
    >
      {!isFullScreenModalOpen && (
        <div className=" flex flex-col     w-full ">
          <span className="text-[#9F9C9C] md:text-lg font-medium">
            Collection distribution today{" "}
          </span>
          <p className="text-xs mt-2 font-light">Total amount</p>
          <span className="text-xl font-semibold text-[#FAFAFA]">
            365.61 AED
          </span>
        </div>
      )}
      <div
        className={`relative grid ${
          isSideBarOpen ? ` grid-cols-3 xl:grid-cols-2` : ` grid-cols-2`
        }   min-h-[340px]  md:h-full gap-y-2 `}
      >
        <div className="flex text-[#FAFAFA] flex-col gap-y-4 justify-center">
          <div className="grid gap-y-4 xl:grid-cols-2">
            <div className="flex flex-col gap-y-5">
              <div className="flexStart gap-x-2">
                <div className="w-3 aspect-square rounded-[3px] bg-[#F68058]"></div>
                <span className="text-xs">Cash 40%</span>
              </div>
              <div className="flexStart gap-x-2">
                <div className="w-3 aspect-square rounded-[3px] bg-[#31D7DD]"></div>
                <span className="text-xs">UPI 40%</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flexStart gap-x-2">
                <div className="w-3 aspect-square rounded-[3px] bg-[#F8E27F]"></div>
                <span className="text-xs">Google Pay 40%</span>
              </div>
              <div className="flexStart gap-x-2">
                <div className="w-3 aspect-square rounded-[3px] bg-[#BC277E]"></div>
                <span className="text-xs">Credit 40%</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            isSideBarOpen ? ` col-span-2 xl:col-span-1` : `col-span-1`
          } flexCenter  h-full`}
        >
          <ResponsiveContainer
            width="100%"
            height={isFullScreenModalOpen ? 200 : "100%"}
          >
            <PieChart>
              <Pie
                data={data}
                innerRadius={isFullScreenModalOpen ? 68 : 58}
                outerRadius={isFullScreenModalOpen ? 105 : 95}
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
                  value="Cash"
                  position="center"
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    fill: "#FFFFFF",
                    transform: "translateY(-15px)",
                  }}
                />
                <Label
                  value={"900AED"}
                  //   value={data
                  //     .reduce((sum, entry) => sum + entry.value, 0)
                  //     .toLocaleString()}
                  position="center"
                  dy={20}
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    fill: "#FFFFFF",
                    transform: "translateY(-10px)",
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
        </div>
      </div>
    </section>
  );
};

export default CashierPerformance;
