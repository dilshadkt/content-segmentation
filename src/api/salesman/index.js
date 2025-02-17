import { SALES_EMPOYEE_SUMMERY, SALES_EMPOYEE_SUMMERY_ID } from "../endpoint";
import API from "../httpService";

export const SalesEmployeeSummary = async () => {
  const { data } = await API.get(SALES_EMPOYEE_SUMMERY, {
    headers: {
      fromDate: "2019-01-01",
      toDate: "2020-01-01",
    },
  });

  return data;
};
export const SaleEmployeeSummaryDetails = async (selectedEmplyee) => {
  const { data } = await API.get(SALES_EMPOYEE_SUMMERY_ID, {
    headers: {
      fromDate: "2019-01-01",
      toDate: "2020-01-01",
      empID: `${selectedEmplyee}`,
    },
  });
  return data;
};
