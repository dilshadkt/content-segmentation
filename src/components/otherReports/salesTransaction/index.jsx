import React, { useEffect, useRef, useState } from "react";
import { OTHER_REPORTS } from "../../../constants";
import { IoMdMore } from "react-icons/io";

const SalesTransaction = () => {
  const [filterBy, setFilterBy] = useState(OTHER_REPORTS[0].title);
  const [isFilterMenuOpen, setFilterMenu] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);
  return (
    <div className="flexBetween  md:flexstart">
      <span className="md:hidden">Filter By</span>
      <div className=" hidden md:flex items-center my-7 gap-3">
        {OTHER_REPORTS.map((item) => (
          <button
            onClick={() => setFilterBy(item.title)}
            key={item.id}
            className={`text-sm ${
              filterBy === item.title
                ? "bg-white text-black shadow-md"
                : "text-gray-600"
            } hover:bg-white py-2 px-4 rounded-lg hover:text-black transition-all`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div ref={menuRef} className="cursor-pointer relative">
        <button onClick={() => setFilterMenu(!isFilterMenuOpen)}>
          <IoMdMore fontSize={"20"} />
        </button>
        {isFilterMenuOpen && (
          <div className="absolute  bg-gray-900 right-0 mt-2 z-40 rounded-md">
            {OTHER_REPORTS.map((item) => (
              <button
                onClick={() => {
                  setFilterBy(item.title);
                  setFilterMenu(false);
                }}
                key={item.id}
                className={` whitespace-nowrap text-xs hover:bg-white py-2 w-full px-8 rounded-lg hover:text-black transition-all`}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTransaction;
