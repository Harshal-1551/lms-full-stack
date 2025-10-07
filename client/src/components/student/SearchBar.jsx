import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <motion.form
      onSubmit={onSearchHandler}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-200 rounded-2xl shadow-md overflow-visible"
    >
      {/* Continuous Border Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl border-2 border-blue-400 pointer-events-none"
        animate={{ boxShadow: ["0 0 5px rgba(37,99,235,0.4)", "0 0 15px rgba(37,99,235,0.6)", "0 0 5px rgba(37,99,235,0.4)"] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />

      {/* Search Icon */}
      <motion.img
        src={assets.search_icon}
        alt="search_icon"
        className="md:w-auto w-8 px-3 z-10"
        whileHover={{ scale: 1.1 }}
      />

      {/* Input Field */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className="w-full h-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-base md:text-lg px-1 z-10"
        placeholder="Search for courses..."
      />

      {/* Search Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-blue-600 rounded-xl text-white md:px-10 px-6 md:py-3 py-2 mx-2 font-semibold shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-300 z-10"
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
