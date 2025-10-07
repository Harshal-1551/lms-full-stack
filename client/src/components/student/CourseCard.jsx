import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { motion } from 'framer-motion'

const CourseCard = ({ course }) => {
    const { currency, calculateRating } = useContext(AppContext)

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="overflow-hidden rounded-xl border border-gray-300 shadow-sm hover:shadow-lg bg-white"
        >
            <Link onClick={() => scrollTo(0, 0)} to={'/course/' + course._id}>
                {/* Course Thumbnail */}
                <div className="h-40 w-full overflow-hidden rounded-t-xl">
                    <img
                        src={course.courseThumbnail || "https://via.placeholder.com/400x200"}
                        alt="thumbnail"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Course Info */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{course.courseTitle}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-1">{course.educator?.name}</p>

                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-sm font-medium">{calculateRating(course)}</p>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <img
                                    key={i}
                                    className="w-3.5 h-3.5"
                                    src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                                    alt=""
                                />
                            ))}
                        </div>
                        <p className="text-gray-400 text-sm">({course.courseRatings.length})</p>
                    </div>

                    <p className="text-base font-semibold text-gray-800 mt-2">
                        {currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
                    </p>
                </div>
            </Link>
        </motion.div>
    )
}

export default CourseCard
