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
import NoDataLoading from "../../shared/loading";

const COLORS = ["#EDA145", "#00C7BE", "#FFCC00"];

const OverAllPerfomance = ({
  className,
  graphClassName,
  data,
  isLoading,
  isError,
}) => {
  const { isSideBarOpen, isFullScreenModalOpen, setFullScreenModalOpen } =
    UseCommon();

  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className="min-h-[380px] lg:col-span-3"
      />
    );
  }
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col  shadow-2xl shadow-slate-700/20
         rounded-xl p-6 relative ${className}`}
    >
      {!isFullScreenModalOpen && (
        <div className=" flexBetween     w-full ">
          <span className="text-[#9F9C9C] md:text-lg font-medium">
            Overall Performance{" "}
          </span>
          <button className=" text-xs md:text-sm  text-[#50AAFF] hover:underline ">
            Select Month
          </button>
        </div>
      )}
      <div
        className={`relative flex flex-col md:flex-row   min-h-[340px]  md:h-full gap-y-2 `}
      >
        <div className="flex text-[#FAFAFA] flex-col gap-y-4 justify-center">
          <h5 className="md:text-lg  text-[#9F9C9C]">Total Covered Sale</h5>
          <span className="md:text-lg">33300 AED</span>
          <ul className="flex md:flex-col gap-4">
            {data?.map((item, index) => (
              <li
                key={index}
                className="flexStart text-sm md:text-base font-light text-gray-300 gap-x-3"
              >
                <span
                  style={{
                    background: COLORS[index],
                  }}
                  className="w-3 rounded-[2px]  aspect-square"
                ></span>{" "}
                {item?.PaymentMode}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 h-full">
          <ResponsiveContainer
            width="100%"
            height={isFullScreenModalOpen ? 200 : "100%"}
          >
            <PieChart>
              <Pie
                data={data}
                innerRadius={isFullScreenModalOpen ? 88 : 68}
                outerRadius={isFullScreenModalOpen ? 125 : 105}
                dataKey="PaymentPercentage"
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
                      value={entry?.PaymentPercentage?.toLocaleString()}
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
                  // value={"900AED"}
                  value={data
                    ?.reduce((sum, entry) => sum + entry.TotalSales, 0)
                    .toLocaleString()}
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
                  dataKey="PaymentPercentage"
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

export default OverAllPerfomance;
