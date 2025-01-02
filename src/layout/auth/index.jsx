import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "../../components/header/auth";
const AuthLayout = () => {
  return (
    <section className="min-h-screen flex flex-col h-screen relative w-full bg-[#141414] text-white">
      <AuthHeader />
      <div className="flex  flex-col h-full  relative z-20">
        <Outlet />
      </div>
      <img
        src="/image/loginIllustration.jpg"
        alt=""
        className="absolute left-0 opacity-15  z-10 bottom-0 top-0 w-full h-full object-cover"
      />
    </section>
  );
};

export default AuthLayout;
