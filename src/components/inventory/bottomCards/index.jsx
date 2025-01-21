import React from "react";
import { UseCommon } from "../../../hooks/UseCommon";
import Card from "./card";

const BottomCards = () => {
  const { isSideBarOpen } = UseCommon();

  return (
    <div
      className={` ${
        !isSideBarOpen
          ? ` md:grid-cols-2 xl:grid-cols-5`
          : ` md:grid-cols-2 lg:grid-cols-3  `
      } xl:h-[230px] shadow-md grid   2xl:grid-cols-5
gap-3  gap-x-3   rounded-lg`}
    >
      {new Array(5).fill(" ").map((product, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default BottomCards;
