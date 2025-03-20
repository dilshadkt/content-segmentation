import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "../../components/header/auth";

const HomeLayout = () => {
  return (
    <section className="h-screen w-full flex flex-col  bg-[#141414]">
      <AuthHeader />
      <div className="flex flex-col overflow-y-auto h-full">
        <Outlet />
      </div>
    </section>
  );
};

export default HomeLayout;
