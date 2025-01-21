import React from "react";

const SubCategory = ({ subCategory, setProductDetails }) => {
  return (
    <div
      className={` transition-all duration-300 ${
        subCategory ? `min-w-[220px] w-1/2  p-3` : ` w-0`
      } rounded-lg h-full overflow-y-auto  overflow-hidden
hidden shadow-md bg-[#2B2829] gap-y-2 md:flex flex-col `}
    >
      <div className="flexBetween">
        <div className="flexStart w-full">
          <div className="flexStart gap-x-3">
            <input
              type="text"
              placeholder="Serach"
              className="border w-full border-[#B5B3B3] bg-transparent rounded-lg py-2 text-sm px-3"
            />
            <button className="bg-black  group shadow-md flexCenter w-10 rounded-lg  aspect-square">
              <img
                src="/icons/search.svg"
                alt=""
                className="w-6 group-hover:scale-110 transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full  gap-y-1 overflow-y-auto">
        {new Array(5).fill(" ").map((stock, index) => (
          <div
            onClick={() => setProductDetails(stock)}
            key={index}
            className="flexBetween group hover:bg-[#2B2829] cursor-pointer p-2 rounded-lg "
          >
            <div className="flex flex-col gap-y-1">
              <h4 className="font-semibold text-sm">Electronics</h4>
              <div className="flexStart gap-x-2">
                <div className="w-4 aspect-square group-hover:scale-95 transition-all duration-300 bg-red-300 rounded-sm"></div>
                <span className="text-xs group-hover:translate-x-1 transition-all duration-300">
                  23 Category
                </span>
              </div>
            </div>
            <button>
              <img
                src="/icons/arrowDown.svg"
                alt=""
                className="-rotate-90 w-3 group-hover:-translate-x-1 transition-all duration-300"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
