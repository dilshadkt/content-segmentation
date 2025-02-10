import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import DashboardHeader from "../../components/header";
import { Outlet } from "react-router-dom";
import API from "../../api/httpService";
import MobileFloatingMenu from "../../components/sideMenu";
import { UseCommon } from "../../hooks/UseCommon";

const DashboardLayout = () => {
  const { isFullScreenModalOpen, setFullScreenModalOpen, Graph } = UseCommon();
  return (
    <main className="flex bg-[#141414] text-[#E2DDF8] overflow-hidden font-radio h-screen">
      <Sidebar />
      <div className=" w-full  flex flex-col h-full">
        <DashboardHeader />
        <div className="h-full w-full  pb-4 md:pb-7 pt-4 px-2 md:px-5 overflow-y-auto">
          <Outlet />
        </div>
        {/* mobile naviagation bar  */}
        <MobileFloatingMenu />
        {/* full screen graph  */}
        {isFullScreenModalOpen && Graph && (
          <div
            onClick={() => setFullScreenModalOpen(false)}
            className={`fixed left-0 right-0 z-50 top-0 px-4 md:p-20
   bottom-0 bg-black/10 backdrop-blur-md flexCenter`}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" w-full md:w-[80%] h-full relative justify-center flex items-center"
            >
              {Graph}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardLayout;
