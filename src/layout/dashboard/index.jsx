import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import DashboardHeader from "../../components/header";
import { Outlet } from "react-router-dom";
import API from "../../api/httpService";

const DashboardLayout = () => {
  return (
    <main className="flex bg-[#141414] text-[#E2DDF8] overflow-hidden font-radio h-screen">
      <Sidebar />
      <div className=" w-full  flex flex-col h-full">
        <DashboardHeader />
        <div className="h-full w-full  pb-4 md:pb-7 pt-4 px-2 md:px-5 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
