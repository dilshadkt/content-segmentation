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
  const [accuracy, setAccuracy] = useState(null);

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
      setError(null);

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

  // Calculate Mean Absolute Percentage Error (MAPE)
  const calculateAccuracy = (actualData, predictedData) => {
    if (actualData.length < 3) return 85; // Default accuracy if not enough data

    let sumPercentageError = 0;
    let validDataPoints = 0;

    for (let i = 0; i < actualData.length; i++) {
      if (actualData[i] !== 0) {
        const absoluteError = Math.abs(actualData[i] - predictedData[i]);
        const percentageError = (absoluteError / actualData[i]) * 100;
        sumPercentageError += percentageError;
        validDataPoints++;
      }
    }

    if (validDataPoints === 0) return 85;

    const mape = sumPercentageError / validDataPoints;
    // Convert MAPE to accuracy percentage (100 - MAPE), with minimum of 50%
    return Math.max(50, 100 - Math.min(mape, 100));
  };

  const processData = (rawData) => {
    // First, group by month and calculate totals
    const monthlyTotals = {};

    rawData.forEach((transaction) => {
      const date = new Date(transaction.TransactionDate);
      const month = date.getMonth() + 1; // 1-12
      const year = date.getFullYear();
      const monthYear = `${year}-${month.toString().padStart(2, "0")}`;

      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }

      monthlyTotals[monthYear] += transaction.InvoiceAmount;
    });

    // Convert to array and sort chronologically
    const sortedMonths = Object.keys(monthlyTotals).sort();
    const monthlyData = sortedMonths.map((monthYear, index) => {
      const [year, month] = monthYear.split("-");
      const monthName = new Date(year, month - 1).toLocaleString("default", {
        month: "short",
      });
      return {
        month: `${monthName} ${year}`,
        sales: monthlyTotals[monthYear],
        x: index + 1, // Numerical value for regression
        date: new Date(year, month - 1), // For proper sorting
      };
    });

    // Sort by date to ensure proper order
    monthlyData.sort((a, b) => a.date - b.date);

    // We need at least 3 data points for meaningful regression
    if (monthlyData.length < 3) {
      setError("Not enough data for forecasting (minimum 3 months required)");
      return;
    }

    // Calculate regression model
    const regressionData = monthlyData.map((d) => [d.x, d.sales]);
    const regressionModel = linearRegression(regressionData);
    const predict = linearRegressionLine(regressionModel);

    // Enhance data with predictions
    const enhancedData = monthlyData.map((d) => ({
      ...d,
      prediction: Math.max(0, Math.round(predict(d.x))), // Ensure predictions aren't negative
    }));

    // Create forecast for next 3 months
    const forecastPoints = [];
    const lastMonth = monthlyData.length;

    for (let i = 1; i <= 3; i++) {
      const nextX = lastMonth + i;
      const nextDate = new Date(monthlyData[monthlyData.length - 1].date);
      nextDate.setMonth(nextDate.getMonth() + i);

      const monthName = nextDate.toLocaleString("default", { month: "short" });
      const year = nextDate.getFullYear();

      forecastPoints.push({
        month: `${monthName} ${year}`,
        prediction: Math.max(0, Math.round(predict(nextX))),
        x: nextX,
        isForecast: true,
      });
    }

    // Calculate accuracy
    const actualValues = enhancedData.map((d) => d.sales);
    const predictedValues = enhancedData.map((d) => d.prediction);
    const modelAccuracy = calculateAccuracy(actualValues, predictedValues);

    setData(enhancedData);
    setPrediction(forecastPoints[0].prediction); // Next month's prediction
    setForecastData([...enhancedData, ...forecastPoints]);
    setAccuracy(modelAccuracy);
  };

  const getAccuracyColor = (accuracyValue) => {
    if (accuracyValue >= 85) return "text-green-500";
    if (accuracyValue >= 70) return "text-yellow-500";
    return "text-red-500";
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
        <p className="text-red-500 text-center max-w-xs">{error}</p>
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

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#333"
              vertical={false}
            />

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

            <Tooltip
              formatter={(value, name) => {
                if (name === "Actual Sales") {
                  return [`₹${value.toLocaleString()}`, name];
                }
                return [`₹${value.toLocaleString()}`, name];
              }}
              labelFormatter={(label) => `Period: ${label}`}
              contentStyle={{ backgroundColor: "#1A1A1A", borderColor: "#333" }}
              itemStyle={{ color: "#9F9C9C" }}
              labelStyle={{ color: "#fff" }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              name="Actual Sales"
              stroke="#1A9FFF"
              strokeWidth={2}
              fill="url(#colorActual)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
            <Area
              type="monotone"
              dataKey="prediction"
              name="Forecast"
              stroke="#2ECC71"
              strokeWidth={2}
              fill="url(#colorPrediction)"
              dot={{ r: 4, strokeDasharray: "" }}
              activeDot={{ r: 6 }}
              strokeDasharray={
                forecastData[forecastData.length - 1].isForecast ? "5 5" : ""
              }
            />
            <Legend
              content={
                <CustomLegend
                  nextPrediction={prediction}
                  accuracy={accuracy}
                  isSideBarOpen={isSideBarOpen}
                />
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-4 flexBetween left-0 pl-7 pr-5 right-0 w-full">
        <span className="text-[#9F9C9C] font-semibold">Sales Forecast</span>
        <div className="flexEnd gap-x-4">
          {accuracy !== null && (
            <div className="flex items-center">
              <span className="text-xs text-[#9F9C9C] mr-2">Accuracy:</span>
              <span
                className={`text-xs font-medium ${getAccuracyColor(accuracy)}`}
              >
                {accuracy.toFixed(1)}%
              </span>
            </div>
          )}
          <button
            onClick={fetchSalesData}
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </section>
  );
};

const CustomLegend = ({ nextPrediction, accuracy, isSideBarOpen }) => {
  const getAccuracyLevel = (value) => {
    if (value >= 85) return "High";
    if (value >= 70) return "Moderate";
    return "Low";
  };

  const getAccuracyColor = (value) => {
    if (value >= 85) return "text-green-500";
    if (value >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div
      className={`flexCenter relative mt-10 -translate-y-4 ${
        isSideBarOpen ? `gap-x-3` : `gap-x-8`
      } ml-20`}
    >
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#1A9FFF] rounded-full mr-2"></div>
        <span className="text-xs text-[#9F9C9C]">Actual Sales</span>
      </div>
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[#2ECC71] rounded-full mr-2"></div>
        <span className="text-xs text-[#9F9C9C]">Forecast</span>
      </div>

      <div className="absolute left-0 right-0 flexCenter text-xs font-light mx-auto top-5 gap-x-24">
        <span>Historical Data</span>
        <div className="flex items-center gap-x-2">
          <span>
            Next Month: ₹
            {nextPrediction ? nextPrediction.toLocaleString() : "0"}
          </span>
          {accuracy !== null && (
            <span className={`text-xs ${getAccuracyColor(accuracy)}`}>
              ({getAccuracyLevel(accuracy)} confidence)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesForecastChart;
