import { useContext } from "react";
import { CommonContext } from "../context/common";

export const UseCommon = () => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
