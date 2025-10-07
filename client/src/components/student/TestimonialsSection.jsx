import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  return (
    <section className="relative py-16 px-6 md:px-40 bg-gray-50 overflow-hidden">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What our <span className="text-indigo-600">Learners Say</span>
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 relative z-10">
        {dummyTestimonial.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 40px rgba(0,0,0,0.2)",
              rotate: [0, 1, -1, 0],
            }}
            className="relative bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Top Info */}
            <div className="flex items-center gap-4 px-6 py-4 bg-indigo-50">
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-14 w-14 rounded-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div>
                <motion.h3
                  className="text-lg font-semibold text-gray-800"
                  whileHover={{ color: "#6366F1" }}
                  transition={{ duration: 0.3 }}
                >
                  {testimonial.name}
                </motion.h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Feedback */}
            <div className="p-6 pt-4">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.img
                    key={i}
                    className="h-5 w-5"
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="star"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm">{testimonial.feedback}</p>
            </div>

            {/* Read More */}
            <div className="px-6 pb-5">
              <a
                href="#"
                className="text-indigo-600 font-medium hover:text-indigo-900 transition-colors duration-300 text-sm"
              >
                Read more
              </a>
            </div>

            {/* Floating gradient circle */}
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
