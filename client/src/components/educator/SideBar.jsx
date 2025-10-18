import React, { useContext, useMemo, useState, memo } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const SideBar = () => {
  const { isEducator, isAdmin } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ useMemo prevents recreating array on every render
  const menuItems = useMemo(() => [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Project", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Projects", path: "/educator/my-courses", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
  ], []);

  if (!isEducator && !isAdmin) return null;

  return (
    <motion.aside
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 240 : 70 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="sticky top-16 min-h-screen flex flex-col py-6 overflow-hidden
                 bg-gradient-to-b from-cyan-50 via-pink-50 to-yellow-50
                 border-r border-gray-200 shadow-lg rounded-r-2xl relative"
    >
      {/* Background Circles */}
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-pink-200/30 rounded-full filter blur-2xl mix-blend-multiply"></div>
      <div className="absolute -bottom-10 -right-8 w-48 h-48 bg-yellow-200/30 rounded-full filter blur-3xl mix-blend-multiply"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-cyan-200/40 rounded-full filter blur-2xl mix-blend-multiply"></div>

      <nav className="flex flex-col gap-2 px-3 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-300
              ${isActive ? "bg-cyan-200 shadow-md" : "hover:bg-pink-100 hover:shadow-sm"}`
            }
          >
            <motion.img
              src={item.icon}
              alt={item.name}
              className="w-7 h-7"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.span
              className="text-gray-900 font-semibold whitespace-nowrap overflow-hidden"
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.name}
            </motion.span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

// ✅ prevent re-render unless context changes
export default memo(SideBar);
