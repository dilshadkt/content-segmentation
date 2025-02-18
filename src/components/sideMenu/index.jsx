import React, { useEffect, useRef } from "react";
import { MENU_ITEMS } from "../../constants";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Link, useParams } from "react-router-dom";
import { UseCommon } from "../../hooks/UseCommon";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

const MobileFloatingMenu = () => {
  const { branchName } = useParams();
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  const menuRef = useRef();

  return (
    <>
      <div
        ref={menuRef}
        className={`${
          isSideBarOpen ? `translate-x-0` : `translate-x-[100%]`
        } z-[1000] p-4 py-5 fixed right-0  md:hidden top-0 bottom-0 bg-[#8909C8]/50 backdrop-blur-md
        transition-all  duration-300   rounded-l-lg my-auto h-fit`}
      >
        <div className="w-full h-full relative">
          <ul
            className="
          flex flex-col gap-y-2
          max-h-[250px]  overflow-y-auto "
          >
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.id !== 9 && `/${branchName}${item.path}`}
              >
                <li className="text-sm py-2  px-2 rounded-md gap-x-3 flexStart ">
                  <img
                    src={`/icons/${item.icon}`}
                    alt={item.title}
                    className="w-5"
                  />
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
          <IoMdArrowDropdown className="absolute  left-0 right-0 mx-auto -bottom-5 text-xl opacity-50" />
        </div>
      </div>

      {/* floating icon */}
      <button
        onClick={() => setSideBarOpen((prev) => !prev)}
        className="fixed z-50 w-14 md:hidden h-14 bg-[#8909C8]
         rounded-full bottom-7 flexCenter right-5"
      >
        {isSideBarOpen ? (
          <IoCloseOutline className="text-3xl" />
        ) : (
          <DehazeIcon />
        )}
      </button>
    </>
  );
};

export default MobileFloatingMenu;
