import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { topSellingDepartment } from "../../../../api/dashbaord";
import { UseCommon } from "../../../../hooks/UseCommon";
import { getColor } from "../../../../lib/GetColor";
import NoDataLoading from "../../../shared/loading";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";
import DateSelector from "../../../shared/datePicker";

const TopSelling = ({ className, graphClassName, initialDate }) => {
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });
  const { isFullScreenModalOpen, setFullScreenGraph, setFullScreenModalOpen } =
    UseCommon();
  const { data, isLoading, isError } = useQuery(
    ["topSellingDepartment", date],
    () => topSellingDepartment(date),
    {
      select: (data) => data?.data?.salesData,
    }
  );
  if (isLoading || isError) {
    return <NoDataLoading isError={isError} className={`h-full`} />;
  }
  return (
    <section
      className={` flex felx-col  bg-[#0D0D0D] h-full  relative rounded-xl ${className}`}
    >
      <div className="w-full   mt-12 ">
        <table className="w-full">
          <thead className="border-b border-[#1A1A1A] text-[#B5B3B3]">
            <tr>
              <th className="text-left pl-7 font-normal w-1/2  py-[10px]">
                Names
              </th>
              <th className="text-left pr-5 py-[10px] font-normal w-1/2 ">
                Sales
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="border-b text-[#B5B3B3] text-sm border-[#1A1A1A]"
              >
                <td className="py-[10px] pl-7 font-light">
                  {item?.Department}
                </td>
                <td className="py-[10px] pr-5">
                  <div className="flexBetween gap-x-7">
                    <div
                      className="relative w-full h-[5px] rounded-full"
                      style={{
                        backgroundColor: getColor(index).backgroundColor,
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          width: `${item?.SalesPercentage}%`,
                          backgroundColor: getColor(index).activeColor,
                        }}
                      ></div>
                    </div>
                    <span
                      className="border text-xs flexCenter py-1 px-2 rounded-lg"
                      style={{
                        borderColor: getColor(index).backgroundColor,
                        color: getColor(index).activeColor,
                      }}
                    >
                      {item?.SalesPercentage}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
        <span className="text-[#9F9C9C] font-semibold">
          Top Selling Departments
        </span>
        <div className="flexEnd gap-x-4">
          <DateSelector setDate={setDate} initialDate={date} />
          {!isFullScreenModalOpen ? (
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TopSelling
                    className={" w-[96%] md:w-2/3 h-fit md:h-[65%]"}
                    initialDate={date}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="" className="w-3" />
            </button>
          ) : (
            <button onClick={() => setFullScreenModalOpen(false)}>
              <CloseIcon className="text-white/45" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSelling;
