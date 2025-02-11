import { COUNTERS_DETAILS, COUNTERS_DETAILS_BY_ID } from "../endpoint";
import API from "../httpService";

export const CounterDetails = async () => {
  const { data } = await API.get(COUNTERS_DETAILS, {
    headers: {
      fromDate: "2019-01-01",
      toDate: "2019-07-31",
    },
  });
  return data;
};

export const CounterSummay = async (counter) => {
  const { data } = await API.get(COUNTERS_DETAILS_BY_ID, {
    headers: {
      fromDate: "2019-01-01",
      toDate: "2025-07-31",
      CounterID: `${counter}`,
    },
  });
  return data;
};
