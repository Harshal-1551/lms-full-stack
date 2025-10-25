import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../../components/student/Footer";


const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 min-h-screen py-20 px-6 md:px-20 text-gray-800 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-700 dark:text-cyan-400 mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          At <span className="font-semibold text-blue-600 dark:text-cyan-400">Aparaitech</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We collect information you provide directly (like name and email) and data collected automatically such as usage information and cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We use the data to improve our services, provide personalized learning experiences, and communicate updates.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Data Security</h2>
        <p className="text-gray-700 dark:text-gray-300">
          We implement modern encryption and security measures to keep your data safe from unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Your Rights</h2>
        <p className="text-gray-700 dark:text-gray-300">
          You can request to view, modify, or delete your personal data anytime by contacting us.
        </p>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Last updated: October 2025
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
