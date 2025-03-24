import React, { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { linearRegression, linearRegressionLine } from "simple-statistics";
import { UseCommon } from "../../hooks/UseCommon";
import axios from "axios";

const SalesForecastChart = ({ className, graphClassName }) => {
  const [data, setData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      setIsLoading(true);

      // Wait for 15 seconds before making the request
      await new Promise((resolve) => setTimeout(resolve, 15000));

      const response = await axios.get(
        "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/getSalesForcastingData"
      );
      const result = response.data;

      if (result.isSucess && result.data) {
        processData(result.data);
      } else {
        throw new Error("Failed to fetch sales data");
      }
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const processData = (rawData) => {
    // Group transactions by month and calculate monthly totals
    const monthlyData = {};
    rawData.forEach((transaction) => {
      const date = new Date(transaction.TransactionDate);
      const monthKey =
        date.toLocaleString("default", { month: "long" }) +
        " " +
        date.getFullYear();

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          sales: 0,
        };
      }

      monthlyData[monthKey].sales += transaction.InvoiceAmount;
    });

    // Convert to array and sort by date
    const sortedData = Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month) - new Date(b.month);
    });

    // Prepare data for regression
    const processedData = sortedData.map((item, index) => ({
      month: item.month,
      sales: item.sales,
      x: index + 1, // Assign a numerical value for regression
    }));

    // Calculate regression model for forecasting
    const regressionModel = linearRegression(
      processedData.map((d) => [d.x, d.sales])
    );
    const predict = linearRegressionLine(regressionModel);

    // Add prediction line to existing data
    const enhancedData = processedData.map((d) => ({
      ...d,
      prediction: Math.round(predict(d.x)),
    }));

    // Create next month prediction
    const nextMonth = processedData.length + 1;
    const nextPrediction = Math.round(predict(nextMonth));

    // Add next month to dataset
    const forecastPoint = {
      month: `Next Month`,
      prediction: nextPrediction,
      x: nextMonth,
    };

    setData(enhancedData);
    setPrediction(nextPrediction);
    setForecastData([...enhancedData, forecastPoint]);
  };

  if (isLoading) {
    return (
      <section
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : `lg:h-full lg:col-span-2`
        } h-[420px] flex flex-col items-center justify-center
          overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4 relative ${className}`}
      >
        <h3 className="text-[#9F9C9C] font-semibold mb-4">Sales Forecast</h3>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Analyzing sales patterns...</p>
          <p className="text-[#9F9C9C] text-sm mt-2">
            Generating prediction model
          </p>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-[#1A1A1A] px-3 py-1 rounded-full">
            <span className="text-xs text-[#9F9C9C]">Please wait a moment</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : `lg:h-full lg:col-span-2`
        } h-[290px] flex flex-col items-center justify-center
        overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4 relative ${className}`}
      >
        <h3 className="text-[#9F9C9C] font-semibold mb-4">Sales Forecast</h3>
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchSalesData}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-2`
            : `lg:h-full lg:col-span-2`
        } h-[290px] flex flex-col items-center justify-center
        overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4 relative ${className}`}
      >
        <h3 className="text-[#9F9C9C] font-semibold mb-4">Sales Forecast</h3>
        <p className="text-[#9F9C9C]">No sales data available</p>
        <button
          onClick={fetchSalesData}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </section>
    );
  }

  return (
    <section
      className={`${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:h-full lg:col-span-2`
      } h-[420px] flex items-end justify-start 
      overflow-hidden bg-[#0D0D0D] rounded-xl py-5 px-4 relative ${className}`}
    >
      <div className={`w-full relative h-[340px] ${graphClassName}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecastData}
            margin={{
              left: 0,
              right: 20,
              bottom: 30,
              top: 20,
            }}
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A9FFF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#1A9FFF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2ECC71" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2ECC71" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
              vertical={false}
            />

            {/* Axes */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#555" }}
              tick={{ fill: "#9F9C9C", fontSize: 10 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#555" }}
              tick={{ fill: "#9F9C9C", fontSize: 10 }}
              dx={-5}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            />

            {/* Tooltip and Legend */}
            <Tooltip
              formatter={(value) => [`₹${value.toLocaleString()}`, null]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#333" }}
              itemStyle={{ color: "#9F9C9C" }}
              labelStyle={{ color: "#fff" }}
            />

            {/* Areas with Gradient */}
            <Area
              type="monotone"
              dataKey="sales"
              name="Actual Sales"
              stroke="#1A9FFF"
              strokeWidth={2}
              fill="url(#colorActual)"
              dot={true}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="prediction"
              name="Prediction"
              stroke="#2ECC71"
              strokeWidth={2}
              fill="url(#colorPrediction)"
              dot={true}
              activeDot={{ r: 6 }}
              strokeDasharray="5 5"
            />
            <Legend content={<CustomLegend nextPrediction={prediction} />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {!isFullScreenModalOpen && (
        <div className="absolute top-4 flexBetween left-0 pl-7 pr-5 right-0 w-full">
          <span className="text-[#9F9C9C] font-semibold">Sales Forecast</span>
          <div className="flexEnd gap-x-4">
            <button
              onClick={fetchSalesData}
              className="text-xs text-blue-400 hover:text-blue-300"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const CustomLegend = (props) => {
  const { payload, nextPrediction } = props;
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
      className={`flexCenter relative mt-10 -translate-y-4 ${
        isSideBarOpen ? `gap-x-3` : `gap-x-8`
      } ml-20`}
    >
      {payload &&
        payload.map((entry, index) => (
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
            <div className="flexStart gap-x-2">
              <img
                src={`${
                  entry.dataKey === "prediction"
                    ? "/icons/greenSale.svg"
                    : "/icons/blueSale.svg"
                }`}
                alt=""
                className="w-5"
              />
            </div>
            <span className="ml-2 text-xs">{entry.value}</span>
          </li>
        ))}
      <hr className="absolute left-0 right-3 top-2 mx-auto w-[1px] h-[20px] bg-[#BDC9D3]" />
      <div className="absolute left-0 gap-x-24 right-0 flexCenter text-xs font-light mx-auto top-5">
        <span>Actual</span>
        <span>
          Next: ₹{nextPrediction ? nextPrediction.toLocaleString() : "0"}
        </span>
      </div>
    </ul>
  );
};

export default SalesForecastChart;
