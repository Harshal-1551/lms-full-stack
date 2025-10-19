import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  const phoneNumber = "6364326342"; // ✅ your WhatsApp number
  const message = encodeURIComponent("Hello! I want to know more about your projects.");

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* “Need help?” Bubble */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-md text-sm font-semibold whitespace-nowrap flex items-center justify-center"
      >
        Need help?
      </motion.div>

      {/* WhatsApp Icon */}
      <motion.button
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110 whatsapp-pulse"
        whileHover={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.6 }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppButton;
