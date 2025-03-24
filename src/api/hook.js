import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";
import axios from "axios";

export const getTodayInsight = (date) =>
  useQuery({
    queryKey: ["todayInsight", date],
    queryFn: () =>
      axios
        .get(
          "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/today-insight",
          {
            headers: {
              fromDate: date?.from,
              toDate: date?.to,
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data.data?.insight[0],
  });
export const getTodayInsightGraph = (date) => {
  const paramsdate = date.to.split("-")[0];
  return useQuery({
    queryKey: ["todayInsightGraph", date],
    queryFn: () =>
      apiClient
        .get(
          `https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/RevenueVsProfitVsExpense
`,
          {
            headers: {
              year: paramsdate,
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data.data?.insight,
  });
};
export const getTotalRevenue = (date) => {
  return useQuery({
    queryKey: ["totalRevenue", date],
    queryFn: () =>
      axios
        .get(
          `https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/TotalRevenue
`,
          {
            headers: {
              fromDate: date?.from,
              toDate: date?.to,
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data?.data?.revenue,
  });
};
export const getTotalSales = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024; // Set year conditionally
  return useQuery({
    queryKey: ["totalSales", date],
    queryFn: () =>
      axios
        .get(
          `https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/SalesData
`,
          {
            headers: {
              fromDate: date.from,
              toDate: date.to,
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data?.data.salesData,
  });
};
export const getTargetVsReality = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024; // Set year conditionally
  return useQuery({
    queryKey: ["targetVsReality", date],
    queryFn: () =>
      apiClient
        .get(`/targetVsReality?date=${yearValue}`)
        .then((res) => res.data),
    select: (data) => data,
  });
};
export const getTotalSellingDepartments = (date) => {
  return useQuery({
    queryKey: ["topSellingDepartment", date],
    queryFn: () =>
      axios
        .get(
          `https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/TopSellingDepartments
`,
          {
            headers: {
              fromDate: date?.from,
              toDate: date?.to,
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data?.data?.salesData,
  });
};
export const getToatalSalesMovement = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024;
  return useQuery({
    queryKey: ["saleMovement"],
    queryFn: () =>
      axios
        .get(
          `https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/ProductMovement
`,
          {
            headers: {
              fromDate: date.from,
              toDate: date.to,
            },
          }
        )
        .then((res) => res.data),
    select: (data) =>
      data?.data?.salesData?.map((item) => ({
        ...item,
        value: Number(item.ItemCount),
      })),
  });
};
export const getCasheirCounter = () =>
  useQuery({
    queryKey: ["cahierCounter"],
    queryFn: () =>
      axios
        .get(
          "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/daily-collection",
          {
            headers: {
              fromDate: "2025-03-10",
              toDate: "2025-03-10",
            },
          }
        )
        .then((res) => res.data),
    select: (data) => data,
  });
export const getSegmentationReport = () =>
  useQuery({
    queryKey: ["cahierCounter"],
    queryFn: () =>
      axios
        .get(
          "https://forzareport-gpbhfsbshdfvhuh8.eastus-01.azurewebsites.net/api/customer-segmentation"
        )
        .then((res) => res.data),
    select: (data) => data?.data,
  });
