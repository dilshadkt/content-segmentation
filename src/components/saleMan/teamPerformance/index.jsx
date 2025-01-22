import { UseCommon } from "../../../hooks/UseCommon";

const TeamPerformance = ({ className, graphClassName }) => {
  const { isSideBarOpen } = UseCommon();
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] grid grid-rows-3
        shadow-2xl shadow-slate-700/20 gap-y-3 h-full rounded-xl  relative ${className}`}
    >
      <div className="w-full bg-[#2E2E2E] rounded-lg flex flex-col gap-y-1 justify-center px-4">
        <span className="text-sm font-light text-[#FAFAFA]">
          Top Performing Department
        </span>
        <h4 className="text-[#FAFAFA] font-medium">Electronics</h4>
        <p className="text-xs text-[#898384]">
          based on where he generates the most sales
        </p>
      </div>
      <div className="w-full bg-[#2E2E2E] rounded-lg flex flex-col gap-y-1 justify-center px-4">
        <span className="text-sm font-light text-[#FAFAFA]">
          Top Performing Prouduct
        </span>
        <h4 className="text-[#FAFAFA] font-medium">Samsung S23 ultra</h4>
        <p className="text-xs text-[#898384]">
          Reflecting the product that has achieved the highest individual sales{" "}
        </p>
      </div>
      <div className="w-full bg-[#2E2E2E] rounded-lg flex flex-col gap-y-1 justify-center px-4">
        <span className="text-sm font-light text-[#FAFAFA]">
          Average Sale Amount
        </span>
        <h4 className="text-[#FAFAFA] font-medium">300.00 AED</h4>
      </div>
    </section>
  );
};

export default TeamPerformance;
