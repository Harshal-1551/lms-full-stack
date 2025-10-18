import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../educator/SideBar";


const EducatorLayout = memo(() => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-yellow-50">
      <SideBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
});

export default EducatorLayout;
