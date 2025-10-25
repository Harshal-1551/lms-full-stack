import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { navigate, role: appRole } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(84);
  
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const clerkRole =
    user?.publicMetadata?.role ||
    (Array.isArray(user?.publicMetadata?.roles) &&
    user.publicMetadata.roles.includes("admin")
      ? "admin"
      : null) ||
    user?.privateMetadata?.role ||
    null;

  const role = appRole || clerkRole || "user";
  const isAdminOrEducator = role === "admin" || role === "educator";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
        setNavHeight(68);
      } else {
        setScrolled(false);
        setNavHeight(84);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // Handle escape key press
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [menuOpen]);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "All Projects", path: "/course-list" },
  ];

  if (isLoaded && user) {
    menuItems.push({ name: "My Enrollments", path: "/my-enrollments" });
  }

  if (isAdminOrEducator) {
    menuItems.push({ name: "Admin Dashboard", path: "/educator" });
  }

  const isActive = (path) => {
    if (!location || !location.pathname) return false;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleMenuClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLinkClick = (path) => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-lg bg-white/60 shadow-lg border-b border-gray-200"
            : "bg-white/30 backdrop-blur-2xl border-b border-transparent"
        }`}
        style={{ height: navHeight }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-24 h-full">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={assets.logo}
              alt="Logo"
              className={`w-24 lg:w-32 transition-transform duration-300 group-hover:scale-105 ${
                scrolled ? "w-20 lg:w-28" : ""
              }`}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
            {user ? (
              <>
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-indigo-500 text-white shadow-md"
                        : "hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

                {/* Wishlist + Cart buttons */}
                <div className="flex items-center gap-4 ml-4">
                  <Link
                    to="/wishlist"
                    className="relative text-gray-700 hover:text-rose-600 transition-transform hover:scale-110"
                  >
                    <FaHeart size={22} />
                  </Link>
                  <Link
                    to="/cart"
                    className="relative text-gray-700 hover:text-emerald-600 transition-transform hover:scale-110"
                  >
                    <FaShoppingCart size={22} />
                  </Link>
                </div>

                {/* User profile */}
                <div className="ml-2 scale-90 hover:scale-100 transition-transform duration-300">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {/* Show Wishlist and Cart icons on mobile when user is logged in */}
            {user && (
              <div className="flex items-center gap-3 mr-1">
                <Link
                  to="/wishlist"
                  className="text-gray-700 hover:text-rose-600 transition-transform hover:scale-110 p-2"
                >
                  <FaHeart size={20} />
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-emerald-600 transition-transform hover:scale-110 p-2"
                >
                  <FaShoppingCart size={20} />
                </Link>
              </div>
            )}
            
            {/* Full Button Style Hamburger Menu */}
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 active:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-indigo-400"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <>
                  <X size={18} className="text-white" />
                  <span className="text-sm font-medium">Close</span>
                </>
              ) : (
                <>
                  <Menu size={18} className="text-white" />
                  <span className="text-sm font-medium">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 mt-[84px]"
                onClick={() => setMenuOpen(false)}
              />
              
              {/* Menu content */}
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl py-6 px-6 z-50"
              >
                <div className="flex flex-col items-center gap-4">
                  {user ? (
                    <>
                      {menuItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleMenuClick(item.path)}
                          className={`w-full max-w-xs px-6 py-3 text-base text-center font-semibold rounded-xl border-2 transition-all duration-300 ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md border-transparent"
                              : "border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-sm"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}

                      {/* User profile in mobile menu */}
                      <div className="mt-4 pt-4 border-t border-gray-200 w-full max-w-xs flex justify-center">
                        <div className="scale-100 hover:scale-105 transition-transform duration-300">
                          <UserButton afterSignOutUrl="/" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        openSignIn();
                      }}
                      className="w-full max-w-xs px-6 py-3 text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      <div style={{ height: navHeight, transition: "height 0.3s ease" }} />
    </>
  );
};

export default Navbar;