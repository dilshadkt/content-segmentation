import React from "react";
import CircularProgress from "../../components/shared/circleProgress";

const BranchesTarget = () => {
  return (
    <section className="w-full h-full font-radio text-gray-50 py-4 px-5 md:px-10 mx-auto flex flex-col ">
      <h4 className="text-xl font-semibold text-gray-300">Branches</h4>
      <div className="w-full grid gap-4 mt-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
        <CircularProgress
          currentValue={2010}
          target={2000}
          location="ABU DHABI"
          subtitle="Earnings Today"
        />
        <CircularProgress
          currentValue={2010}
          target={2000}
          location="ABU DHABI"
          subtitle="Earnings Today"
        />
        {/* <CircularProgress
          currentValue={350}
          target={2000}
          location="ABU DHABI"
          subtitle="Earnings Today"
        />
        <CircularProgress
          currentValue={1040}
          target={2000}
          location="ABU DHABI"
          subtitle="Earnings Today"
        /> */}
      </div>
    </section>
  );
};

export default BranchesTarget;
