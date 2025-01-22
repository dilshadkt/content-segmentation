import {
  PRODUCT_MOVEMENT,
  TARGET_VS_REALITY,
  TODAY_INSIGHT,
  TODAY_INSIGHT_GAPH,
  TOP_SELLING_BRANCHES,
  TOP_SELLING_DEPARTMENT,
  TOTAL_REVENUE,
  TOTAL_SALES,
} from "../endpoint";
import API from "../httpService";

export const insight = async ({ from, to }) => {
  const { data } = await API.get(TODAY_INSIGHT, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
export const insightGraph = async ({ from, to }) => {
  const { data } = await API.get(TODAY_INSIGHT_GAPH, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};

export const totalRevenue = async ({ from, to }) => {
  const { data } = await API.get(TOTAL_REVENUE, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
export const totalSales = async ({ from, to }) => {
  const { data } = await API.get(TOTAL_SALES, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
export const targetVsReality = async ({ from, to }) => {
  const { data } = await API.get(TARGET_VS_REALITY, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
export const topSellingDepartment = async ({ from, to }) => {
  const { data } = await API.get(TOP_SELLING_DEPARTMENT, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
export const topSellingBranches = async () => {
  const { data } = await API.get(TOP_SELLING_BRANCHES, {
    headers: {
      fromDate: "2024-01-01",
      toDate: "2025-01-01",
    },
  });
  return data;
};
export const productMovement = async ({ from, to }) => {
  const { data } = await API.get(PRODUCT_MOVEMENT, {
    headers: {
      fromDate: from,
      toDate: to,
    },
  });
  return data;
};
