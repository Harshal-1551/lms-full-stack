import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SearchBar = ({ data, textColor = "white" }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate("/course-list/" + input);
  };

  return (
    <motion.form
      onSubmit={onSearchHandler}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-between w-full max-w-2xl md:h-16 h-14 rounded-2xl 
      bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
      overflow-hidden px-3 md:px-5"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent"
        animate={{
          boxShadow: [
            "0 0 10px rgba(0, 168, 255, 0.4)",
            "0 0 25px rgba(0, 168, 255, 0.8)",
            "0 0 10px rgba(0, 168, 255, 0.4)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* Search icon */}
      <motion.img
        src={assets.search_icon}
        alt="search_icon"
        className="w-7 md:w-8 z-10 opacity-90 filter invert brightness-200 drop-shadow-[0_0_2px_white]"
        whileHover={{ scale: 1.1 }}
      />

      {/* Input field */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className={`w-full h-full bg-transparent outline-none px-3 text-base md:text-lg z-10 placeholder-gray-400`}
        style={{ color: textColor }}
        placeholder="Search for Projects..."
      />

      {/* Search button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="z-10 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold 
        rounded-xl md:px-8 px-6 md:py-3 py-2 shadow-lg hover:shadow-cyan-500/40 hover:brightness-110 
        transition-all duration-300"
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
