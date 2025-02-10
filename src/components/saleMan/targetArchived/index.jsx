import React, { useState } from "react";
import { UseCommon } from "../../../hooks/UseCommon";
import { useQuery } from "react-query";
import { SalesEmployeeSummary } from "../../../api/salesman";
import NoDataLoading from "../../shared/loading";

const TargetArchived = ({ setSelectedEmplyee, selectedEmplyee }) => {
  const { data, isLoading, isError, error } = useQuery(
    "targetArchived",
    () => SalesEmployeeSummary(),
    {
      select: (data) => data.data?.salesData,
      onSuccess: (data) => setSelectedEmplyee(data[0]?.SalesManID),
    }
  );
  const { isSideBarOpen } = UseCommon();
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`min-h-full  ${
          isSideBarOpen
            ? ` col-span-1 lg:col-span-2 2xl:col-span-1`
            : `col-span-1`
        } `}
      />
    );
  }
  return (
    <div
      className={`bg-[#0D0D0D] ${
        isSideBarOpen
          ? ` col-span-1 lg:col-span-2 2xl:col-span-1`
          : `col-span-1`
      }  py-5 px-4  h-[400px] lg:h-full   flex flex-col overflow-y-auto `}
    >
      <div className="flexBetween">
        <span>Target Archived</span>
        <span className="text-sm">Sales Man List</span>
      </div>
      <div className="flex flex-col overflow-y-auto   gap-y-3 mt-7">
        {data?.map((item, index) => (
          <div
            onClick={() => setSelectedEmplyee(item?.SalesManID)}
            key={item?.SalesManID}
            className={`p-2  flexStart cursor-pointer group 
            rounded-lg gap-x-3 ${
              selectedEmplyee === item?.SalesManID && `bg-[#9F9C9C]`
            }
             hover:bg-[#9F9C9C]`}
          >
            <div className="w-16  rounded-lg h-16  bg-gray-800 flexCenter overflow-hidden ">
              <img
                src="/image/profile2.svg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-start h-16  ">
              <span
                className={`  ${
                  selectedEmplyee === item?.SalesManID && `text-gray-800`
                } font-medium group-hover:text-[#FAFAFA]`}
              >
                {item?.SalesManName}
              </span>
              <p className="text-xs text-[#666666] group-hover:text-[#DADADA]">
                Top sale - {item?.InvoiceAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetArchived;
