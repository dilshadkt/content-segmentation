import React from "react";

const CustomLegend = () => {
  const labels = [
    {
      id: 1,
      value: "Low",
      color: "#963333",
    },
    {
      id: 2,
      value: "Average",
      color: "#B8936E",
    },
    {
      id: 3,
      value: "High",
      color: "#007846",
    },
  ];
  return (
    <ul className="flexBetween pl-10 w-1/2  ">
      {labels.map((label) => (
        <div key={label.id} className="flexStart gap-x-2">
          <div
            style={{
              backgroundColor: label.color,
            }}
            className="w-4 h-4 rounded-sm "
          ></div>
          <span className="text-[#999999] text-sm">{label.value}</span>
        </div>
      ))}
    </ul>
  );
};

export default CustomLegend;
