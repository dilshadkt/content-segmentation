import React from "react";
import { menuItems } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { UseCommon } from "../../hooks/UseCommon";
import { MdLogout } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };
  const { isSideBarOpen, setSideBarOpen } = UseCommon();
  return (
    <section
      className={`transition-all hidden md:flex duration-300 bg-[#1A1A1A] h-full gap-y-8 py-6 
          justify-between flex-col ${
            isSideBarOpen
              ? "translate-x-0 w-[280px] pl-6 pr-4"
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
            AROMA
          </div>
          <span className="ml-3 text-lg">Aroma Report</span>
          <button onClick={() => setSideBarOpen(false)} className="ml-4">
            <img src="/icons/arrowDown.svg" alt="" className="w-3 -rotate-90" />
          </button>
        </div>
        <ul className="flex flex-col h-full overflow-y-auto gap-y-2 font-light mt-4">
          {menuItems.map((item) => (
            <Link key={item.id} to={item.id !== 9 && item.path}>
              <li
                className="flexStart p-3 hover:bg-[#2F1B8C]
              gap-x-4 cursor-pointer rounded-lg text-sm"
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
      <div className="flex flex-col overflow-hidden">
        <button onClick={handleLogout} className="flexStart gap-x-5 mt-4">
          <MdLogout />
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
