import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const location = useLocation();
  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }

      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/update-role`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEducator(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 👇 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        scrolled
          ? "bg-cyan-100/80 backdrop-blur-xl shadow-md py-2"
          : "bg-cyan-100/70 backdrop-blur-lg py-4"
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-24">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={assets.logo}
            alt="Logo"
            className={`transition-all duration-300 ${
              scrolled ? "w-24 lg:w-28" : "w-28 lg:w-32"
            } hover:scale-105`}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>

              <Link
                to="/my-enrollments"
                className="px-5 py-2 rounded-full border border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
              >
                My Enrollments
              </Link>
            </>
          )}

          {user ? (
            <div className="ml-2">
              <UserButton />
            </div>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="ml-2 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-cyan-100/80 backdrop-blur-xl border-t border-gray-200 animate-slideDown">
          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="w-11/12 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-md hover:scale-105 transition-all duration-300"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>

              <Link
                to="/my-enrollments"
                className="w-11/12 py-2 rounded-full border border-cyan-500 text-cyan-600 text-center font-medium hover:bg-cyan-500 hover:text-white shadow-sm transition-all duration-300"
              >
                My Enrollments
              </Link>
            </>
          )}

          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="w-11/12 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:scale-105 shadow-md transition-all duration-300"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </nav>
    <div style={{ height: `${scrolled ? 56 : 80}px` }} />
    </>
  );
};

export default Navbar;
