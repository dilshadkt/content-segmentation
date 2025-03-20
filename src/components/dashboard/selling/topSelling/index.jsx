import React, { useState } from "react";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import DateSelector from "../../../shared/customSelector/index";
import { getTotalSellingDepartments } from "../../../../api/hook";
import NoDataLoading from "../../../shared/loader";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

const COLORS = [
  { bgColor: "#00274B", activeColor: "#1A9FFF" },
  { bgColor: "#1C583C", activeColor: "#2ECC71" },
  { bgColor: "#250070", activeColor: "#9967FF" },
  { bgColor: "#753E00", activeColor: "#FF9A26" },
];

const TopSelling = ({ className }) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Set to Monday of the current week

  const [date, setDate] = useState({
    from: startOfWeek.toISOString().split("T")[0],
    to: getFormattedDate(0),
  });

  const { isFullScreenModalOpen, setFullScreenGraph, setFullScreenModalOpen } =
    UseCommon();
  const { data, isLoading } = getTotalSellingDepartments(date);

  if (isLoading)
    return <NoDataLoading className={"col-span-1 h-full lg:col-span-2"} />;

  return (
    <section
      className={`flex flex-col bg-[#0D0D0D] h-full relative rounded-xl ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="w-full absolute top-4 right-5 mb-5 flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}

      <div className="w-full mt-12">
        <table className="w-full">
          <thead className="border-b border-[#1A1A1A] text-[#B5B3B3]">
            <tr>
              <th className="text-left pl-7 font-normal w-1/2 py-[10px]">
                Names
              </th>
              <th className="text-left pr-5 py-[10px] font-normal w-1/2">
                Sales
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const color = COLORS[index % COLORS.length]; // Cycle through COLORS array
              return (
                <tr
                  key={index}
                  className="border-b text-[#B5B3B3] text-sm border-[#1A1A1A]"
                >
                  <td className="py-[10px] pl-7 font-light">{item.category}</td>
                  <td className="py-[10px] pr-5">
                    <div className="flexBetween gap-x-7">
                      <div
                        className="relative w-full h-[5px] rounded-full"
                        style={{ backgroundColor: color.bgColor }}
                      >
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            width: `${item.progress}%`,
                            backgroundColor: color.activeColor,
                          }}
                        ></div>
                      </div>
                      <span
                        className="border text-xs flexCenter py-1 px-2 rounded-lg"
                        style={{
                          borderColor: color.activeColor,
                          color: color.activeColor,
                        }}
                      >
                        {item.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!isFullScreenModalOpen && (
        <div className="absolute top-4 flexBetween left-0 pl-7 pr-5 right-0 w-full">
          <span className="text-[#9F9C9C] font-semibold">
            Top Selling Departments
          </span>
          <div className="flexEnd gap-x-4">
            <DateSelector
              setDate={setDate}
              initialDate={date}
              dateOption={["This Week", "Previous Week"]}
            />
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TopSelling
                    className={" w-[96%] md:w-2/3 h-fit md:h-[65%]"}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="Full View" className="w-3" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopSelling;
