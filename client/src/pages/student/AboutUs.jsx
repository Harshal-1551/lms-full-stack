import React from "react";
import { motion } from "framer-motion";
import { FaLaptopCode, FaUsers, FaLightbulb, FaCogs } from "react-icons/fa";
import { useEffect } from "react";
import BackButton from "../../components/common/BackButton";
import Footer from "../../components/student/Footer";


const AboutUs = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
   <>
     <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 min-h-screen py-20 px-6 md:px-16">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-cyan-400 mb-6">
          About <span className="text-blue-500">Aparaitech</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          At <span className="font-semibold text-blue-600 dark:text-cyan-400">Aparaitech</span>,
          we’re passionate about building innovative digital solutions that help businesses grow,
          educators teach, and students learn. We specialize in creating seamless, scalable, and
          user-friendly software applications tailored to your goals.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mt-16 text-center"
      >
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-cyan-400 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          To deliver high-quality software and learning platforms that inspire innovation and
          make technology accessible to everyone — from startups and enterprises to educators
          and students worldwide.
        </p>
      </motion.div>

      {/* What We Do Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-20 text-center"
      >
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaLaptopCode className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Web Development</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We build responsive, modern, and secure web apps with React, Node.js, MongoDB,
            and the latest tech stack.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaUsers className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">UI / UX Design</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Our creative team designs intuitive and user-friendly interfaces that bring ideas
            to life with a focus on experience.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaLightbulb className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Project Consultation</h3>
          <p className="text-gray-600 dark:text-gray-400">
            From planning to deployment — we help clients transform ideas into successful
            real-world projects.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaCogs className="text-5xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Automation & AI</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Empowering businesses with smart automation, AI-driven tools, and data-based
            insights for faster decision-making.
          </p>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mt-20 text-center"
      >
        <h2 className="text-3xl font-semibold text-blue-700 dark:text-cyan-400 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          To become a global technology leader known for innovation, reliability, and a strong
          commitment to empowering the next generation through digital transformation.
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h3 className="text-2xl font-semibold mb-3">Want to Collaborate With Us?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Let’s build something innovative together. Reach out to us today.
        </p>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          Contact Us on WhatsApp
        </a>
      </motion.div>
    </div>
    <Footer/>
   </>
  );
};

export default AboutUs;
