import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Companies = () => {
  const logos = [
    { src: assets.microsoft_logo, alt: "Microsoft" },
    { src: assets.walmart_logo, alt: "Walmart" },
    { src: assets.accenture_logo, alt: "Accenture" },
    { src: assets.adobe_logo, alt: "Adobe" },
    { src: assets.paypal_logo, alt: "PayPal" },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* ===== Background Video Section ===== */}
      <div className="relative h-[80vh] w-full flex flex-col justify-center items-center px-6">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dfytp36ni/video/upload/v1760175666/Hailuo_Video_Corporate_employees_shaking_ha_433348472440627209_ay7nze.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* ===== Headings ===== */}
        <div className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            Our Collaborations & Partnerships
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-gray-200 mt-4 text-lg sm:text-xl md:text-2xl"
          >
            Trusted by industry-leading brands across the globe
          </motion.p>
        </div>

        {/* ===== Company Cards shifted downward ===== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="relative z-10 mt-auto mb-6 sm:mb-10 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 10px 30px rgba(0,255,255,0.3)",
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(0,128,255,0.15))",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 w-24 sm:w-28 md:w-36 flex flex-col items-center justify-center shadow-lg hover:shadow-indigo-400/30 transition-all duration-500"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-14 sm:w-16 md:w-20 mb-2 sm:mb-3 object-contain filter brightness-95"
              />
              <p className="text-white text-sm sm:text-base md:text-xl font-bold text-center">
                {logo.alt}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Companies;
