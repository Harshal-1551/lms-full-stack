import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { role } = useContext(AppContext);
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!user) return null; // educator area only visible to logged in users

  const menuItems = [
    { label: "Dashboard", path: "/educator" },
    { label: "Add Project", path: "/educator/add-course" },
    { label: "My Projects", path: "/educator/my-courses" },
    { label: "Students Enrolled", path: "/educator/student-enrolled" },
  ];

  // If user is admin, keep same links (admin has both admin+educator access)
  // Optionally you could add an admin-only link later.

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
          scrolled ? "bg-cyan-50/80 backdrop-blur-md py-2 shadow-md" : "bg-cyan-50/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-10">
          <Link to="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="Logo" className={`transition-all duration-300 ${scrolled ? "w-24 lg:w-28" : "w-28 lg:w-32"}`} />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} className={`text-gray-700 font-medium hover:text-cyan-700 transition ${location.pathname === item.path ? "text-cyan-700" : ""}`}>
                {item.label}
              </Link>
            ))}

            <p className="text-gray-600 font-medium text-sm">{role?.toUpperCase() || "USER"} — {user.fullName}</p>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-3 py-3 bg-cyan-50/90 border-t border-gray-200">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-cyan-700">
                {item.label}
              </Link>
            ))}
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </nav>

      <div className={`${scrolled ? "h-12 md:h-14" : "h-20 md:h-24"} transition-all duration-300`} />
    </>
  );
};

export default Navbar;
