import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const location = useLocation();
  const { navigate, role } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if admin
  const isAdmin = role === "educator" || role === "admin";

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-lg bg-white/70 shadow-lg border-b border-gray-200"
            : "bg-white/40 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-24 py-3">
          {/* Logo */}
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-28 lg:w-32 transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-gray-800 font-medium">
            {/* Common menu for all users */}
            <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
            <Link to="/course-list" className="hover:text-indigo-600 transition">Courses</Link>
            {user && (
              <Link to="/my-enrollments" className="hover:text-indigo-600 transition">
                My Enrollments
              </Link>
            )}

            {/* Admin-only menu */}
            {isAdmin && (
              <>
                <Link to="/educator" className="hover:text-indigo-600 transition">
                  Dashboard
                </Link>
                <Link to="/educator/add-course" className="hover:text-indigo-600 transition">
                  Add Course
                </Link>
                <Link to="/educator/my-courses" className="hover:text-indigo-600 transition">
                  My Courses
                </Link>
                <Link to="/educator/student-enrolled" className="hover:text-indigo-600 transition">
                  Students
                </Link>
              </>
            )}

            {/* Auth section */}
            {user ? (
              <div className="ml-2 scale-90 hover:scale-100 transition-transform duration-300">
                <UserButton />
              </div>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden flex flex-col items-center gap-4 pb-6 bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-md"
            >
              <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
              <Link onClick={() => setMenuOpen(false)} to="/course-list">Courses</Link>
              {user && <Link onClick={() => setMenuOpen(false)} to="/my-enrollments">My Enrollments</Link>}

              {isAdmin && (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/educator">Dashboard</Link>
                  <Link onClick={() => setMenuOpen(false)} to="/educator/add-course">Add Course</Link>
                  <Link onClick={() => setMenuOpen(false)} to="/educator/my-courses">My Courses</Link>
                  <Link onClick={() => setMenuOpen(false)} to="/educator/student-enrolled">Students</Link>
                </>
              )}

              {user ? (
                <UserButton />
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:scale-105"
                >
                  Create Account
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for navbar height */}
      <div style={{ height: scrolled ? 68 : 84 }} />
    </>
  );
};

export default Navbar;
