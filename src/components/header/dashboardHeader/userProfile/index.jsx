import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaBuilding } from "react-icons/fa6";

const UserProfile = () => {
  const { branchName } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  return (
    <div className="flexEnd gap-x-3  relative">
      <FaBuilding className="text-gray-200 text-2xl" />
      <div className="flexStart gap-x-8">
        <div className="md:flex hidden flex-col font-light text-sm">
          <span className="text-[#8C79E5] font-medium capitalize">
            {branchName}
          </span>
          <span className="text-xs text-[#726C6C]">Admin</span>
        </div>
        <button onClick={() => setMenuOpen(!isMenuOpen)} className=" px-1 py-4">
          <img
            src="/icons/arrowDown.svg"
            alt=""
            className={`${isMenuOpen ? `-rotate-180` : `rotate-0`}
            transition-all duration-300`}
          />
        </button>
      </div>
      {/* {isMenuOpen && ( */}
      <div
        className={` ${
          !isMenuOpen ? `translate-x-[130%]` : `translate-x-0`
        } absolute border border-gray-400/20 shadow-md  transition-all duration-300
        whitespace-nowrap z-50 text-sm  px-5 p-2 bg-black rounded-md w-fit top-full mt-3`}
      >
        <Link
          to={"/branches"}
          className="flexStart p-3 group  hover:text-[#7158E2]
              gap-x-4 cursor-pointer"
        >
          <img src="/icons/department.svg" alt="" className="w-4" />
          <span className="group-hover:translate-x-1 transition-all duration-300">
            View Branches
          </span>
        </Link>
        <button
          onClick={handleLogout}
          className="flexStart p-3 group  hover:text-[#7158E2]
              gap-x-4 cursor-pointer"
        >
          <img src="/icons/logout.svg" alt="" className="w-4" />
          <span className="group-hover:translate-x-1 transition-all duration-300">
            {" "}
            Sign Out
          </span>
        </button>
      </div>
      {/* )} */}
    </div>
  );
};

export default UserProfile;
