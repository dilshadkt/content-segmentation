import {
  PRODUCT_MOVEMENT,
  TARGET_VS_REALITY,
  TODAY_INSIGHT,
  TOP_SELLING_BRANCHES,
  TOP_SELLING_DEPARTMENT,
  TOTAL_REVENUE,
  TOTAL_SALES,
} from "../endpoint";
import API from "../httpService";

export const insight = async () => {
  const { data } = await API.get(
    TODAY_INSIGHT,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};

export const totalRevenue = async () => {
  const { data } = await API.get(
    TOTAL_REVENUE,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
export const totalSales = async () => {
  const { data } = await API.get(
    TOTAL_SALES,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
export const targetVsReality = async () => {
  const { data } = await API.get(
    TARGET_VS_REALITY,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
export const topSellingDepartment = async () => {
  const { data } = await API.get(
    TOP_SELLING_DEPARTMENT,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
export const topSellingBranches = async () => {
  const { data } = await API.get(
    TOP_SELLING_BRANCHES,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
export const productMovement = async () => {
  const { data } = await API.get(
    PRODUCT_MOVEMENT,
    {},
    {
      headers: {
        fromDate: "2024-01-01",
        toDate: "2025-01-01",
      },
    }
  );
  return data;
};
