import React from "react";
import clsx from "clsx";

const PrimaryButton = ({ children, className }) => {
  return (
    <button
      className={clsx(
        ` text-xs rounded-lg py-2 flexCenter
text-white `,
        className
      )}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
