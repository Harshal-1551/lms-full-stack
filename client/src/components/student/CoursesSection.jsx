import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CoursesSection = () => {
    const { allCourses } = useContext(AppContext);

    return (
        <section className="py-16 md:px-40 px-6 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
            {/* Section Heading */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    Learn from the <span className="text-indigo-600">Best</span>
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                    Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
                </p>
            </motion.div>

            {/* Courses Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
            >
                {allCourses.slice(0, 4).map((course, index) => (
                    <CourseCard key={index} course={course} />
                ))}
            </motion.div>

            {/* Show All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mt-10"
            >
                <Link
                    to={'/course-list'}
                    onClick={() => scrollTo(0, 0)}
                    className="inline-block text-gray-700 border border-gray-300 px-10 py-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                    Show all courses
                </Link>
            </motion.div>
        </section>
    )
}

export default CoursesSection;
