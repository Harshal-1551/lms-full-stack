import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const CourseCard = ({ course }) => {
  const { calculateRating } = useContext(AppContext);

  const currency = "$"; // USD

  // Discounted price calculation
  const finalPrice = course.discount > 0
    ? (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)
    : course.coursePrice.toFixed(2);
  const originalPrice = course.discount > 0 ? course.coursePrice.toFixed(2) : null;

  const rating = calculateRating(course);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg bg-white"
    >
      {/* Main clickable area */}
      <Link onClick={() => scrollTo(0, 0)} to={`/course/${course._id}`} className="block">
        {/* Course Thumbnail */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={course.courseThumbnail || "https://via.placeholder.com/400x200"}
            alt={course.courseTitle}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {course.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {course.discount}% OFF
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-4 flex flex-col justify-between h-[200px] sm:h-[220px]">
          <div>
            {/* Domain */}
            <div className="mb-2">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {course.domain || "General"}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {course.courseTitle}
            </h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-1">
              {course.educator?.name || "Unknown Educator"}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-3.5 h-3.5"
                    src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">{rating}</p>
              <p className="text-gray-400 text-sm">({course.courseRatings.length})</p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-base font-semibold text-gray-800">{currency}{finalPrice}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">{currency}{originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      {/* View More Details button */}
      {course.pdfLink && (
        <div className="p-4">
          <a
            href={course.pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View More Details
          </a>
        </div>
      )}

    </motion.div>
  );
};

export default CourseCard;
