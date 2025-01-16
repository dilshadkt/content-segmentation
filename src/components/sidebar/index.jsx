import React from "react";
import { menuItems } from "../../constants";
import { Link, useLocation, useParams } from "react-router-dom";
import { UseCommon } from "../../hooks/UseCommon";

const Sidebar = () => {
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  const { branchName } = useParams();
  const { pathname } = useLocation();
  return (
    <section
      className={`transition-all hidden md:flex duration-300
         bg-[#1A1A1A] h-full gap-y-8 py-6 
          justify-between flex-col ${
            isSideBarOpen
              ? "translate-x-0 min-w-[250px] pl-6 pr-4"
              : "-translate-x-full w-[0] pl-0 pr-0"
          }`}
    >
      {/* menu navigation */}
      <div className="flex flex-col overflow-y-auto">
        <div className="flexStart">
          <div
            className="w-[45px] flexCenter aspect-square text-[10px] text-white rounded-lg bg-gradient-to-r 
    from-[#8909C8] to-[#361DA7]"
          >
            FORZA
          </div>
          <span className="ml-3 text-lg">Forza Report</span>
          <button onClick={() => setSideBarOpen(false)} className="ml-4">
            <img src="/icons/arrowDown.svg" alt="" className="w-3 -rotate-90" />
          </button>
        </div>
        <ul className="flex flex-col h-full overflow-y-auto gap-y-2 font-light mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.id !== 9 && `/${branchName}${item.path}`}
            >
              <li
                className={` ${
                  pathname === `/${branchName}${item.path}` && `bg-[#2F1B8C]`
                }
                   flexStart p-3 hover:bg-[#2F1B8C]
              gap-x-4 cursor-pointer rounded-lg text-sm`}
              >
                <div>
                  <img src={`/icons/${item.icon}`} alt="" className="w-5" />
                </div>
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* premium navigation */}
      <div className="h-fit py-7 overflow-hidden relative flexCenter rounded-lg">
        <img
          src="/image/proBg.svg"
          alt=""
          className="w-full h-full object-cover absolute left-0 right-0 top-0 bottom-0"
        />
        <div className="relative flex flex-col gap-y-2 items-center z-20">
          <div
            className="w-[40px] aspect-square rounded-lg 
      bg-gradient-to-r text-[9px] flexCenter from-[#CD84F1] to-[#7158E2]"
          >
            FORZA
          </div>
          <p className="text-xs font-light w-4/6 text-center">
            Get access to all features on Report
          </p>
          <button className="text-xs mt-1 bg-[#0D0D0D] px-5 py-1 rounded-lg">
            <span className="bg-gradient-to-r from-[#CD84F1] to-[#7158E2] bg-clip-text text-transparent">
              Get Pro
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
