import React from "react";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { topSellingBranches } from "../../../../api/dashbaord";

const TopSellingBranches = ({ className }) => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();
  const { data: dummy } = useQuery("topSellingBranches", topSellingBranches, {
    select: (data) => data?.data?.salesData,
  });

  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : ` lg:col-span-2 `
      } bg-[#0D0D0D] relative flex flex-col rounded-xl  ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="w-full absolute top-4 right-5 flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}
      {!isFullScreenModalOpen && (
        <div className="  flexBetween  pl-5 pr-5 my-3 w-full ">
          <span className="text-[#9F9C9C] font-semibold">
            Top Selling Branches
          </span>
          <div className="flexEnd gap-x-4">
            <button className="flexStart gap-x-2">
              <span>Week</span>
              <img src="/icons/arrowDown.svg" alt="" className="w-2" />
            </button>
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TopSellingBranches
                    className={" w-[96%] md:w-1/2 h-fit md:h-[70%]"}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="" className="w-3" />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col px-5   h-full">
        <h4 className="font-light">Branch List</h4>
        <p className="text-sm text-[#726C6C]"> Daily Average Sale</p>
        <div className="flex flex-col mt-2  h-full overflow-y-auto">
          {dummy?.map((item, index) => (
            <div
              key={index}
              className={`flexBetween ${
                index !== dummy?.length - 1 && ` border-b `
              } py-2 min-h-16 border-[#97979780]/50`}
            >
              <div className="flex flex-col">
                <h3 className="text-[#B5B3B3] font-medium">{item.branch}</h3>
                <span className="text-sm font-light text-[#B5B3B3] -translate-y-1">
                  {item.location}
                </span>
              </div>
              <div>
                <img
                  src={
                    item.grow ? "/icons/growGraph.svg" : "/icons/lossGraph.svg"
                  }
                  alt=""
                />
              </div>
              <div className="flexEnd gap-x-2">
                <span className="font-medium ">{item.dailyAverageSale}</span>

                <img
                  src={item.grow ? "/icons/grow.svg" : "/icons/loss.svg"}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSellingBranches;
