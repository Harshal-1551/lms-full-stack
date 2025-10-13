import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../../components/student/SearchBar";

const heroImages = [
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1759929146/Gemini_Generated_Image_1vi89i1vi89i1vi8_edfx32.png",
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1760012887/Gemini_Generated_Image_zb530fzb530fzb53_zisadd.png",
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1760175670/Gemini_Generated_Image_ruv0dxruv0dxruv0_mvq20z.png",
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1760175668/Gemini_Generated_Image_4voow84voow84voo_s8emzw.png",
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1760175665/Gemini_Generated_Image_g0ptxfg0ptxfg0pt_pqwwh1.png",
  "https://res.cloudinary.com/dfytp36ni/image/upload/v1760175665/Gemini_Generated_Image_r3y8oqr3y8oqr3y8_ov6uw4.png",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fadeVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.8, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 1.2, ease: "easeInOut" } },
  };

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-7 md:px-0 space-y-6"
      >
        <h1 className="md:text-5xl text-3xl font-extrabold text-white max-w-3xl mx-auto leading-snug drop-shadow-xl">
          Discover & Showcase <span className="text-cyan-400">Innovative Projects</span>
        </h1>

        <p className="hidden md:block text-gray-200 max-w-2xl mx-auto text-lg">
          Explore real-world company projects, collaborate with teams, and gain hands-on experience.
          Showcase your skills, learn from industry experts, and take your career to the next level.
        </p>

        <p className="md:hidden text-gray-200 max-w-sm mx-auto text-base">
          Explore company projects and showcase your skills — anywhere, anytime.
        </p>

        {/* Call-to-action / Search */}
        <div className="w-full flex justify-center mt-4">
          <SearchBar placeholder="Search Projects..." />
        </div>

        {/* Subtle tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-gray-300 text-sm md:text-base mt-2 italic"
        >
          "Where ideas meet innovation."
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero;
