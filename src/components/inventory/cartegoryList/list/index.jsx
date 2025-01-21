import React from "react";

const ListItem = ({ setProductDetails, setSubCategory, item }) => {
  return (
    <div
      onClick={() => {
        setProductDetails(null);
        setSubCategory(item);
      }}
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
  );
};

export default ListItem;
