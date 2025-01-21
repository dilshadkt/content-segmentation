import { SELLING_ITEMS_COLOR } from "../constants";

export const getColor = (index) => {
  return SELLING_ITEMS_COLOR[index % SELLING_ITEMS_COLOR.length];
};
