import React, { useState, useContext, useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const SideBar = () => {
  const { isEducator, isAdmin } = useContext(AppContext);
  const [sidebarStyle, setSidebarStyle] = useState("modern"); // modern, glass, minimal, gradient, card

  // ✅ useMemo prevents recreating array on every render
  const menuItems = useMemo(() => [
    { name: "Dashboard", path: "/educator", icon: assets.home_icon },
    { name: "Add Project", path: "/educator/add-course", icon: assets.add_icon },
    { name: "My Projects", path: "/educator/my-courses", icon: assets.my_course_icon },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: assets.person_tick_icon },
  ], []);

  if (!isEducator && !isAdmin) return null;

  // Style 1: Modern SaaS Style
  const ModernSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-64 flex flex-col py-6 overflow-hidden
                 bg-white border-r border-gray-100 shadow-sm relative">
      {/* Accent Bar */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
      
      <nav className="flex flex-col gap-1 px-4 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300
              ${isActive 
                ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500 shadow-sm" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-l-4 hover:border-gray-200"
              }`
            }
          >
            <motion.img
              src={item.icon}
              alt={item.name}
              className="w-5 h-5"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="font-medium text-sm whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Style 2: Glass Morphism Style
  const GlassSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-64 flex flex-col py-6 overflow-hidden
                 bg-white/80 backdrop-blur-xl border-r border-white/20 
                 shadow-xl relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-xl"></div>

      <nav className="flex flex-col gap-2 px-4 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? "bg-white/60 shadow-lg border border-white/40 text-blue-600" 
                : "text-gray-600 hover:bg-white/40 hover:shadow-md hover:border hover:border-white/30"
              }`
            }
          >
            <motion.div
              className="p-2 rounded-lg bg-white/50 shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <img src={item.icon} alt={item.name} className="w-4 h-4" />
            </motion.div>
            <span className="font-semibold text-sm whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Style 3: Minimal Dark Style
  const MinimalSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-56 flex flex-col py-6 overflow-hidden
                 bg-gray-900 border-r border-gray-700 relative">
      <nav className="flex flex-col gap-3 px-4 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300
              ${isActive 
                ? "bg-gray-800 text-white shadow-inner" 
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <motion.div
              className="flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5 filter invert" />
            </motion.div>
            <span className="font-medium text-sm whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Style 4: Gradient Background Style
  const GradientSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-64 flex flex-col py-6 overflow-hidden
                 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-700
                 border-r border-purple-500 shadow-2xl relative">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
      
      <nav className="flex flex-col gap-3 px-4 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? "bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/20" 
                : "text-white/80 hover:bg-white/10 hover:text-white hover:shadow-md hover:border hover:border-white/10"
              }`
            }
          >
            <motion.div
              className="p-1"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5 filter invert" />
            </motion.div>
            <span className="font-semibold text-sm whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Style 5: Card-based Style
  const CardSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-64 flex flex-col py-6 overflow-hidden
                 bg-gray-50 border-r border-gray-200 relative">
      <nav className="flex flex-col gap-3 px-4 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? "bg-white shadow-lg border border-gray-200 text-blue-600" 
                : "bg-white/50 shadow-sm border border-gray-100 text-gray-600 hover:shadow-lg hover:bg-white"
              }`
            }
          >
            <motion.div
              className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-inner"
              whileHover={{ scale: 1.1 }}
            >
              <img src={item.icon} alt={item.name} className="w-4 h-4" />
            </motion.div>
            <span className="font-semibold text-sm whitespace-nowrap">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Style 6: Clean Professional Style
  const CleanSidebar = () => (
    <aside className="sticky top-16 min-h-screen w-60 flex flex-col py-6 overflow-hidden
                 bg-white border-r border-gray-200 shadow-sm">
      <nav className="flex flex-col gap-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/educator"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? "bg-blue-500 text-white shadow-md" 
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <img src={item.icon} alt={item.name} className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  // Render selected style
  const renderSidebar = () => {
    switch(sidebarStyle) {
      case "glass":
        return <GlassSidebar />;
      case "minimal":
        return <MinimalSidebar />;
      case "gradient":
        return <GradientSidebar />;
      case "card":
        return <CardSidebar />;
      case "clean":
        return <CleanSidebar />;
      default:
        return <ModernSidebar />;
    }
  };

  return (
    <>
      {/* Style Selector - Remove this in production */}
      <div className="fixed bottom-4 left-4 z-50 bg-white p-3 rounded-lg shadow-lg border">
        <label className="block text-xs font-medium text-gray-700 mb-1">Sidebar Style:</label>
        <select 
          value={sidebarStyle} 
          onChange={(e) => setSidebarStyle(e.target.value)}
          className="text-xs border rounded px-2 py-1 w-32"
        >
          <option value="modern">Modern</option>
          <option value="glass">Glass</option>
          <option value="minimal">Minimal Dark</option>
          <option value="gradient">Gradient</option>
          <option value="card">Card Style</option>
          <option value="clean">Clean</option>
        </select>
      </div>
      
      {renderSidebar()}
    </>
  );
};

// ✅ prevent re-render unless context changes
export default memo(SideBar);