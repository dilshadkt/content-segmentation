import CloseIcon from "@mui/icons-material/Close";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { totalRevenue } from "../../../../api/dashbaord";
import { UseCommon } from "../../../../hooks/UseCommon";
import NoDataLoading from "../../../shared/loading";
import CustomLegend from "./customeLegend";
import DateSelector from "../../../shared/datePicker";
import { getFormattedDate } from "../../../../lib/GetFormatedDate";

const TotalRevenueBarChart = ({ className, graphClassName, initialDate }) => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenGraph,
    setFullScreenModalOpen,
  } = UseCommon();
  const [date, setDate] = useState({
    from: initialDate?.from || getFormattedDate(0),
    to: initialDate?.to || getFormattedDate(0),
  });
  const { isLoading, data, isError } = useQuery(
    ["totalRevenue", date],
    () => totalRevenue(date),
    {
      select: (data) => data?.data?.revenue,
    }
  );
  const revenueData = data;

  //  calculating for better ui experince in the graph
  const largestValue = useMemo(() => {
    return (
      data
        ?.reduce((max, item) => Math.max(max, item.Sales, item.Expense), 0)
        ?.toString() || 0
    );
  }, [data]);

  if (isLoading || isError) {
    return (
      <NoDataLoading
        className={`${
          isSideBarOpen
            ? `col-span-1 2xl:col-span-3`
            : ` lg:h-full lg:col-span-3`
        } h-[290px] w-full `}
      />
    );
  }
  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-3` : ` lg:h-full lg:col-span-3`
      } h-[290px]  
     relative flex items-end justify-start bg-[#0D0D0D] rounded-xl p-6 ${className}`}
    >
      <div className={` h-[190px] w-full ${graphClassName}`}>
        <ResponsiveContainer height="100%">
          <BarChart
            data={revenueData}
            margin={{
              left:
                largestValue?.length > 5
                  ? -2
                  : largestValue.length > 3
                  ? -10
                  : -26,
              bottom: -12,
            }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis axisLine={false} tickLine={false} fontSize={12} />
            <CartesianGrid vertical={false} horizontal stroke="#1B1B1B" />
            {/* <Tooltip /> */}
            <Legend content={<CustomLegend />} />{" "}
            <Bar dataKey="Expense" fill="#6F57DE" barSize={10} />
            <Bar dataKey="Sales" fill="#4A6DA7" barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* {!isFullScreenModalOpen && ( */}
      <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
        <span className="text-[#9F9C9C] font-semibold">Total Revenue</span>
        <div className="flexEnd gap-x-4 ">
          <DateSelector setDate={setDate} initialDate={date} />
          {!isFullScreenModalOpen ? (
            <button
              onClick={() =>
                setFullScreenGraph(
                  <TotalRevenueBarChart
                    className={" w-[96%] md:w-full h-fit   md:h-full"}
                    graphClassName={" h-[230px] md:h-[400px]"}
                    initialDate={date}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="" className="w-3" />
            </button>
          ) : (
            <div className="w-full ">
              <button onClick={() => setFullScreenModalOpen(false)}>
                <CloseIcon className="text-white/45" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TotalRevenueBarChart;
