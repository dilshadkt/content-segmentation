import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import CustomLegend from "../customeLegend";

const Barchart = ({ graphClassName, revenueData }) => {
  //  calculating for better ui experince in the graph
  const largestValue = useMemo(() => {
    return (
      revenueData
        ?.reduce((max, item) => Math.max(max, item.Sales, item.Expense), 0)
        ?.toString() || 0
    );
  }, [revenueData]);
  return (
    <div className={` h-[190px] w-full ${graphClassName}`}>
      <ResponsiveContainer height="100%">
        <BarChart
          data={revenueData}
          margin={{
            left:
              largestValue?.length > 5
                ? -2
                : largestValue.length > 3
                ? -10
                : -26,
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
  );
};

export default Barchart;
