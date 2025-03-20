import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";

export const getTodayInsight = () =>
  useQuery({
    queryKey: ["todayInsight"],
    queryFn: () => apiClient.get("/today-insight").then((res) => res.data),
    select: (data) => data.todayInsight[0],
  });
export const getTodayInsightGraph = (date) => {
  const paramsdate = date.to.split("-")[0];
  return useQuery({
    queryKey: ["todayInsightGraph", date],
    queryFn: () =>
      apiClient
        .get(`/today-insight-graph?date=${paramsdate}`)
        .then((res) => res.data),
    select: (data) => data.todayInsight,
  });
};
export const getTotalRevenue = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024; // Set year conditionally

  return useQuery({
    queryKey: ["totalRevenue", date],
    queryFn: () =>
      apiClient.get(`/totalRevenue?date=${yearValue}`).then((res) => res.data),
    select: (data) => data,
  });
};
export const getTotalSales = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024; // Set year conditionally
  return useQuery({
    queryKey: ["totalSales", date],
    queryFn: () =>
      apiClient.get(`/totalSales?date=${yearValue}`).then((res) => res.data),
    select: (data) => data,
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
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024; // Set year conditionally
  return useQuery({
    queryKey: ["topSellingDepartment", date],
    queryFn: () =>
      apiClient
        .get(`/topSellingDepartment?date=${yearValue}`)
        .then((res) => res.data),
    select: (data) => data,
  });
};
export const getToatalSalesMovement = (date) => {
  const paramsdate = parseInt(date.to.split("-")[2], 10); // Extract day and convert to number
  const todayDate = new Date().getDate(); // Get today's day

  const yearValue = paramsdate === todayDate ? 2025 : 2024;
  return useQuery({
    queryKey: ["saleMovement"],
    queryFn: () =>
      apiClient.get(`/saleMovement?date=${yearValue}`).then((res) => res.data),
    select: (data) =>
      data?.map((item) => ({ ...item, value: Number(item.value) })),
  });
};
export const getCasheirCounter = () =>
  useQuery({
    queryKey: ["cahierCounter"],
    queryFn: () => apiClient.get("/casheir").then((res) => res.data),
    select: (data) => data,
  });
