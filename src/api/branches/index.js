import { ALL_BRANCHES, EDIT_BRANCHES, GET_BRANCH_TARGET } from "../endpoint";
import API from "../httpService";

export const GetAllBranches = async () => {
  const { data } = await API.get(ALL_BRANCHES);

  return data;
};

export const GetBranchTargetSettings = async () => {
  const { data } = await API.post(GET_BRANCH_TARGET);
  return data;
};

export const CreateTarget = async (targetData) => {
  const { data } = await API.post(EDIT_BRANCHES, targetData);
  return data;
};
