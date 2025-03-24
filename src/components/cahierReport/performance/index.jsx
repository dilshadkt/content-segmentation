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

const COLORS = ["#BC277E", "#00C7BE", "#F68058", "#F8E27F"];

const CashierPerformance = ({ className, graphClassName, data }) => {
  const { isSideBarOpen, isFullScreenModalOpen, setFullScreenModalOpen } =
    UseCommon();
  const filteredData = data?.map((item) => ({
    ...item,
    value: Number(item.amount),
  }));

  // Calculate total amount
  const totalAmount = data
    ? data.reduce((sum, entry) => sum + entry.amount, 0)
    : 0;

  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col shadow-2xl shadow-slate-700/20
         rounded-xl p-6 relative ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="top-4 right-5 absolute flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}

      {!isFullScreenModalOpen && (
        <div className="flex flex-col w-full mb-4">
          <span className="text-[#9F9C9C] md:text-lg font-medium">
            Collection distribution today{" "}
          </span>
          <p className="text-xs mt-2 font-light">Total amount</p>
          <span className="text-xl font-semibold text-[#FAFAFA]">
            {totalAmount.toFixed(2)} INR
          </span>
        </div>
      )}

      <div className="relative flex flex-col items-center min-h-[300px]">
        {/* Chart with integrated legend */}
        <div className="w-full h-full flex flex-col items-center">
          <ResponsiveContainer
            width="100%"
            height={isFullScreenModalOpen ? 250 : 300}
          >
            <PieChart>
              <Pie
                data={filteredData}
                innerRadius={isFullScreenModalOpen ? 70 : 80}
                outerRadius={isFullScreenModalOpen ? 110 : 130}
                dataKey="amount"
                paddingAngle={4}
                stroke="none"
                cornerRadius={7}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      filter={`drop-shadow(0 0 3px ${
                        COLORS[index % COLORS.length]
                      })`}
                    />
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
                  value={`${totalAmount.toFixed(2)} INR`}
                  position="center"
                  dy={20}
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 400,
                    fill: "#FFFFFF",
                    transform: "translateY(-5px)",
                  }}
                />
                <LabelList
                  dataKey="amount"
                  position="inside"
                  fill="#fff"
                  formatter={(value) => `${value.toFixed(1)}%`}
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                />
              </Pie>
              <Tooltip
                formatter={(value) => [`${value.toFixed(1)}%`, "Amount"]}
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  borderColor: "#333",
                }}
                itemStyle={{ color: "#FFF" }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Payment Methods Legend */}
          <div className="flex flex-wrap justify-center mt-4 gap-6">
            {data &&
              data.map((item, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 aspect-square rounded-[3px]"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-white">
                      {item.paymentMode}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.amount.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CashierPerformance;
