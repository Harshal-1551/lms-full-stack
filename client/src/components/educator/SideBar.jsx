import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const SideBar = () => {
  const { isEducator } = useContext(AppContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Project', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Projects', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  if (!isEducator) return null;

  return (
    <motion.div
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 240 : 70 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="sticky top-16 min-h-screen flex flex-col py-6 overflow-hidden
                 bg-gradient-to-b from-cyan-50 via-pink-50 to-yellow-50
                 border-r border-gray-200 shadow-lg rounded-r-2xl relative"
    >
      {/* Background decorative circles */}
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-pink-200/30 rounded-full filter blur-2xl animate-blob mix-blend-multiply"></div>
      <div className="absolute -bottom-10 -right-8 w-48 h-48 bg-yellow-200/30 rounded-full filter blur-3xl animate-blob mix-blend-multiply animation-delay-2000"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-cyan-200/40 rounded-full filter blur-2xl animate-blob mix-blend-multiply animation-delay-4000"></div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2 px-3 relative z-10">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/educator'}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-3 py-2 rounded-xl transition-all duration-300
               ${isActive ? 'bg-cyan-200 shadow-md' : 'hover:bg-pink-100 hover:shadow-sm'}`
            }
          >
            <motion.img
              src={item.icon}
              alt={item.name}
              className="w-7 h-7"
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.span
              className="text-gray-900 font-semibold whitespace-nowrap overflow-hidden"
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.name}
            </motion.span>
          </NavLink>
        ))}
      </div>

      {/* Footer / Logout */}
      <motion.div
        className="mt-auto px-3 py-4 relative z-10"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
      
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
