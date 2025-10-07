import React from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import SearchBar from "../../components/student/SearchBar";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70"
    >
      <motion.h1
        data-aos="fade-up"
        className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto leading-snug"
      >
        Learn Smarter, Grow Faster — 
        <span className="text-blue-600"> Your Future Starts Here.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </motion.h1>

      <motion.p
        data-aos="fade-up"
        data-aos-delay="200"
        className="md:block hidden text-gray-600 max-w-2xl mx-auto"
      >
        Discover industry-leading courses created by expert educators. Learn
        anytime, anywhere — and build real-world skills that set you apart.
      </motion.p>

      <motion.p
        data-aos="fade-up"
        data-aos-delay="300"
        className="md:hidden text-gray-600 max-w-sm mx-auto"
      >
        Explore top-rated courses and learn from expert mentors — anytime,
        anywhere.
      </motion.p>

      <motion.div
        data-aos="zoom-in"
        data-aos-delay="400"
        className="w-full flex justify-center"
      >
        <SearchBar />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
