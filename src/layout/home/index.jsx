import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/header/auth";

const HomeLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (pathname === "/") {
      if (token) {
        return navigate("/branches");
      } else {
        return navigate("/auth/login");
      }
    }
  }, []);
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
