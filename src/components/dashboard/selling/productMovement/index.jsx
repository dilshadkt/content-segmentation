import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  LabelList,
} from "recharts";
import { UseCommon } from "../../../../hooks/UseCommon";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "react-query";
import { productMovement } from "../../../../api/dashbaord";
import NoDataLoading from "../../../shared/loading";

const COLORS = ["#9789FF", "#37F4E8"];

const ProductMovement = ({ className, graphClassName }) => {
  const {
    isSideBarOpen,
    isFullScreenModalOpen,
    setFullScreenModalOpen,
    setFullScreenGraph,
  } = UseCommon();
  const { data, isLoading, isError } = useQuery(
    "productMovement",
    productMovement,
    {
      select: (data) => data?.data?.salesData,
    }
  );
  if (isLoading || isError) {
    return (
      <NoDataLoading
        isError={isError}
        className={`${
          isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
        }`}
      />
    );
  }

  return (
    <section
      className={` ${
        isSideBarOpen ? `col-span-1 2xl:col-span-2` : `lg:col-span-2`
      } bg-[#0D0D0D] flex flex-col   rounded-xl p-6 relative ${className}`}
    >
      {isFullScreenModalOpen && (
        <div className="w-full absolute  top-4 right-5 flexEnd">
          <button onClick={() => setFullScreenModalOpen(false)}>
            <CloseIcon className="text-white/45" />
          </button>
        </div>
      )}
      <div
        className={`relative flex flex-col h-[270px] mb-4 md:h-full gap-y-2 mt-6`}
      >
        <ResponsiveContainer
          width="100%"
          height={isFullScreenModalOpen ? 190 : "100%"}
        >
          <PieChart>
            <Pie
              data={data}
              innerRadius={isFullScreenModalOpen ? 58 : 48}
              outerRadius={isFullScreenModalOpen ? 95 : 85}
              dataKey="Percentage"
              paddingAngle={4}
              stroke="none"
              cornerRadius={7}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  filter={`drop-shadow(0 0 3px ${COLORS[index]})`}
                >
                  <Label
                    value={entry.Percentage.toLocaleString()}
                    position="center"
                    fill="#fff"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 400,
                    }}
                  />
                </Cell>
              ))}
              <Label
                value="Total Items"
                position="center"
                style={{
                  fontSize: "0.775rem",
                  fontWeight: 400,
                  fill: "#FFFFFF",
                }}
              />
              <Label
                value={data
                  ?.reduce((sum, entry) => sum + entry.Percentage, 0)
                  .toLocaleString()}
                position="center"
                dy={20}
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  fill: "#FFFFFF",
                }}
              />
              <LabelList
                dataKey="Percentage"
                position="inside"
                fill="#fff"
                formatter={(value) => `${value.toLocaleString()}%`}
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 400,
                }}
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className=" flexCenter absolute -bottom-4 left-0 right-0 mx-auto gap-x-6">
          {data?.map((item, index) => (
            <div key={index} className="flexStart gap-x-3">
              <div className="w-2 h-2 rounded-full bg-[#6F57DE]"></div>
              <div className="flex flex-col">
                <span className="text-sm">{item?.MovementCategory}</span>
                <span className="text-xs text-[#6F57DE]">
                  {item?.ItemCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isFullScreenModalOpen && (
        <div className="absolute top-4  flexBetween  left-0 pl-7 pr-5 right-0 w-full ">
          <span className="text-[#9F9C9C] font-semibold">Sales </span>
          <div className="flexEnd gap-x-4">
            <button className="flexStart gap-x-2">
              <span>Select Week</span>
              <img src="/icons/arrowDown.svg" alt="" className="w-2" />
            </button>
            <button
              onClick={() =>
                setFullScreenGraph(
                  <ProductMovement
                    className={" w-[96%] md:w-2/3 h-fit md:h-[65%]"}
                  />
                )
              }
            >
              <img src="/icons/fullView.svg" alt="" className="w-3" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductMovement;
