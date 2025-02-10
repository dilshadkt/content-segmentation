import { COUNTERS_DETAILS } from "../endpoint";
import API from "../httpService";

export const CounterDetails = async () => {
  const { data } = await API.get(COUNTERS_DETAILS, {
    headers: {
      fromDate: "2019-01-01",
      toDate: "2025-07-31",
    },
  });
  return data;
};
