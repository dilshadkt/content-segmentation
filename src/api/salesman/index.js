import { SALES_EMPOYEE_SUMMERY } from "../endpoint";
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
