import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full px-6 md:px-0 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-50 overflow-hidden">
      
      {/* Background angled shapes */}
      <div className="absolute top-0 left-1/2 w-[150%] h-[600px] bg-purple-200/40 -skew-y-12 rounded-xl blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[120%] h-[500px] bg-pink-200/30 -skew-x-12 rounded-xl blur-2xl pointer-events-none animate-pulse-slow"></div>

      {/* Floating Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl p-12 bg-white/20 backdrop-blur-md rounded-3xl shadow-xl text-center flex flex-col items-center gap-6"
      >
        <h1 className="md:text-6xl text-4xl font-bold text-gray-900">Learn anything, anytime, anywhere</h1>
        <p className="text-gray-800 sm:text-base md:text-lg">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl transition-all duration-300"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, color: "#7C3AED" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-gray-700 font-semibold hover:text-purple-600 transition-colors duration-300"
          >
            Learn More
            <img src={assets.arrow_icon} alt="arrow_icon" className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

    </section>
  );
};

export default CallToAction;
