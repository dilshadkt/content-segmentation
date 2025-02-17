import React, { useEffect } from "react";
import CircularProgress from "../../components/shared/circleProgress";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { GetAllBranches } from "../../api/branches";
import Shimmer from "../../components/shared/shimmer";
const BranchesTarget = () => {
  const { data, isLoading } = useQuery("branches", GetAllBranches, {
    select: (data) => data.data,
  });

  return (
    <section className="w-full h-full font-radio text-gray-50 py-4 px-5 md:px-10 mx-auto flex flex-col ">
      <div className="flexBetween">
        <h4 className="text-xl font-semibold text-gray-300">Branches</h4>
        <Link to={"/targetSettings"} className="hover:underline">
          Target Settings
        </Link>
      </div>
      <div className="w-full grid gap-4 mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        {isLoading ? <Loading /> : <BranchList branches={data} />}
      </div>
    </section>
  );
};

export default BranchesTarget;

const Loading = () => {
  return new Array(8)
    .fill(" ")
    .map((_, index) => (
      <Shimmer key={index} className="bg-gray-700/20 h-[330px]" />
    ));
};

const BranchList = ({ branches }) => {
  return (
    <>
      {branches?.map((branch) => (
        <CircularProgress
          key={branch?.BranchID}
          currentValue={branch?.PercentageCompleted}
          target={branch?.TargetAmount}
          location={branch?.BranchName}
          subtitle="Earnings Today"
        />
      ))}
    </>
  );
};
