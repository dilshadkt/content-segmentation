import React from "react";
import { getColor } from "../../../../../lib/GetColor";

const SellingGraph = ({ data }) => {
  return (
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
              <td className="py-[10px] pl-7 font-light">{item?.Department}</td>
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
  );
};

export default SellingGraph;
