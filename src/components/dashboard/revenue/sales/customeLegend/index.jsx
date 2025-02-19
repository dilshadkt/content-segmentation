import { UseCommon } from "../../../../../hooks/UseCommon";
export const CustomLegend = (props) => {
  const { payload, salesData } = props;
  // Calculate total sales for "Last Week" and "This Week"
  const totalLastWeek = salesData.reduce(
    (sum, item) => sum + item["Last Week"],
    0
  );
  const totalThisWeek = salesData.reduce(
    (sum, item) => sum + item["This Week"],
    0
  );

  const { isSideBarOpen } = UseCommon();
  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        listStyle: "none",
        padding: 0,
      }}
      className={` flexCenter relative  -translate-y-4 ${
        isSideBarOpen ? `gap-x-3` : `gap-x-8`
      }  ml-20`}
    >
      {payload.map((entry, index) => (
        <li
          key={`legend-item-${index}`}
          style={{
            marginRight: 20,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: entry.color,
          }}
        >
          {/* Square color indicator */}
          <div className="flexStart gap-x-2">
            <img
              src={`${
                entry.value === "Last Week"
                  ? "/icons/greenSale.svg"
                  : "/icons/blueSale.svg"
              }`}
              alt=""
              className="w-5"
            />
          </div>
          <span className="ml-2 text-xs">
            {entry.value} {/* Legend text */}
          </span>
        </li>
      ))}
      <hr className="absolute left-0 right-3 top-2 mx-auto w-[1px] h-[20px] bg-[#BDC9D3]" />
      <div className="absolute left-0 gap-x-24 right-0 flexCenter text-xs font-light mx-auto top-5 ">
        <span>{totalLastWeek}</span>
        <span>{totalThisWeek}</span>
      </div>
    </ul>
  );
};
