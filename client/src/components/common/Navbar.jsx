import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // ✅ added icons

const Navbar = () => {
  const location = useLocation();
  const { navigate, role: appRole } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(84); // default height

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
        <div className="flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-24 h-full">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={assets.logo}
              alt="Logo"
              className={`w-28 lg:w-32 transition-transform duration-300 group-hover:scale-105 ${
                scrolled ? "w-24 lg:w-28" : ""
              }`}
            />
          </div>

          {/* ✅ Desktop Menu */}
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

                {/* ❤️ Wishlist + 🛒 Cart buttons */}
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
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="md:hidden flex flex-col items-center gap-3 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-lg py-4 px-6 rounded-2xl mx-4 mt-2"
            >
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleMenuClick(item.path)}
                      className={`min-w-[60%] px-4 py-2 text-sm text-center font-semibold rounded-full border transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md border-transparent"
                          : "border-indigo-300 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-400"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}

                  {/* ❤️ Wishlist + 🛒 Cart (Mobile) */}
                  <div className="flex items-center justify-center gap-8 mt-3">
                    <Link
                      to="/wishlist"
                      onClick={() => setMenuOpen(false)}
                      className="text-rose-600 hover:text-rose-700 transition-transform hover:scale-110"
                    >
                      <FaHeart size={22} />
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="text-emerald-600 hover:text-emerald-700 transition-transform hover:scale-110"
                    >
                      <FaShoppingCart size={22} />
                    </Link>
                  </div>

                  <div className="mt-3 scale-90 hover:scale-100 transition-transform duration-300">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="min-w-[60%] px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-md hover:opacity-90 transition-all duration-300"
                >
                  Create Account
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div style={{ height: navHeight, transition: "height 0.3s ease" }} />
    </>
  );
};

export default Navbar;
