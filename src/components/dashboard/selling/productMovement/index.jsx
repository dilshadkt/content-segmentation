import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../shared/customSelector/index";
import { getToatalSalesMovement } from "../../../../api/hook";
import NoDataLoading from "../../../shared/loader";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

// Function to generate random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProductMovement = ({ className, graphClassName }) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2); // 1st day of the current month

  const [date, setDate] = useState({
    from: startOfMonth.toISOString().split("T")[0],
    to: getFormattedDate(0),
  });

  const { data, isLoading } = getToatalSalesMovement(date);
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    setFullScreenGraph,
  } = UseCommon();

  // Generate random colors for each data entry
  if (isLoading)
    return <NoDataLoading className={"col-span-1 lg:col-span-2"} />;
  const COLORS = data.map(() => getRandomColor());

  return (
    <section
      className={`${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col rounded-xl p-6 relative ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="w-full absolute top-4 right-5 flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}
      <div
        className={`relative flex flex-col h-[250px] md:h-full gap-y-2 mt-6`}
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
        <div className="flexCenter">
          <div className="flexStart gap-x-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[0] }}
            ></div>
            <div className="flex flex-col">
              <span className="text-sm">Moving Items</span>
              <span className="text-xs" style={{ color: COLORS[0] }}>
                11400
              </span>
            </div>
          </div>
          <hr className="w-5 rotate-90 ml-3 mr-2" />
          <div className="flexStart gap-x-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[1] }}
            ></div>
            <div className="flex flex-col">
              <span className="text-sm">Slow Moving</span>
              <span className="text-xs" style={{ color: COLORS[1] }}>
                11400
              </span>
            </div>
          </div>
        </div>
      </div>
      {!isFullScreenModalOpen && (
        <div className="absolute top-4 flexBetween left-0 pl-7 pr-5 right-0 w-full">
          <span className="text-[#9F9C9C] font-semibold">Sales</span>
          <div className="flexEnd gap-x-4">
            <DateSelector
              setDate={setDate}
              initialDate={date}
              dateOption={["This Month", "Previous Month"]}
            />
            <button
              onClick={() =>
                setFullScreenGraph(
                  <ProductMovement
                    className={"w-[96%] md:w-2/3 h-fit md:h-[65%]"}
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

export default ProductMovement;
