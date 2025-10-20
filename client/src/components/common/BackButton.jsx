import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Routes where Back button should NOT appear
  const excludedRoutes = ["/", "/login", "/register"];

  // ✅ Don’t show on excluded routes
  if (excludedRoutes.includes(location.pathname)) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        fixed 
        top-30 left-10   /* 👈 moves it slightly below navbar */
        bg-blue-600 hover:bg-blue-700 
        text-white px-3 py-2 rounded-full 
        shadow-lg flex items-center gap-2 
        z-40 transition-all duration-300 
        hover:scale-105
      "
    >
      <IoArrowBack className="text-lg" />
      <span className="hidden sm:inline text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;
