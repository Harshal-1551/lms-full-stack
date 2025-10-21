import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const {
    calculateRating,
    wishlist = [], // ✅ Ensure default array
    cart = [], // ✅ Ensure default array
    toggleWishlist,
    addCourseToCart,
    removeCourseFromCart,
  } = useContext(AppContext);

  // ✅ Handle missing course gracefully
  if (!course) return null;

  const currency = "$"; // USD

  // ✅ Safe discount and price calculation
  const coursePrice = Number(course.coursePrice) || 0;
  const discount = Number(course.discount) || 0;

  const finalPrice =
    discount > 0
      ? (coursePrice - (discount * coursePrice) / 100).toFixed(2)
      : coursePrice.toFixed(2);

  const originalPrice = discount > 0 ? coursePrice.toFixed(2) : null;

  // ✅ Safe rating handling
  const rating = calculateRating ? calculateRating(course) : 0;

  // ✅ Prevent crash when wishlist/cart undefined
  const inWishlist = (wishlist ?? []).some(
    (c) => String(c._id) === String(course._id)
  );
  const inCart = (cart ?? []).some(
    (c) => String(c._id) === String(course._id)
  );

  // ✅ Safe handlers
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleWishlist) await toggleWishlist(course._id);
  };

  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) {
      if (removeCourseFromCart) await removeCourseFromCart(course._id);
    } else {
      if (addCourseToCart) await addCourseToCart(course._id);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-lg bg-white"
    >
      {/* Main clickable area */}
      <Link
        onClick={() => scrollTo(0, 0)}
        to={`/course/${course._id}`}
        className="block"
      >
        {/* Course Thumbnail */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={course.courseThumbnail || "https://via.placeholder.com/400x200"}
            alt={course.courseTitle}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Course Info */}
        <div className="p-4 flex flex-col justify-between h-[250px] sm:h-[260px]">
          <div>
            {/* Domain */}
            <div className="mb-2">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                🌐 {course.domain || "General"}
              </span>
            </div>

            {/* Title and Educator */}
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {course.courseTitle || "Untitled Course"}
            </h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-1">
              {course.educator?.name || "Unknown Educator"}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="w-4 h-4"
                    src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">{rating}</p>
              <p className="text-gray-400 text-sm">
                ({course.courseRatings?.length ?? 0})
              </p>
            </div>

            {/* Wishlist & Cart icons below rating */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={handleWishlist}
                aria-label="Add to wishlist"
                className={`p-2 rounded-full border transition-all hover:scale-110 ${
                  inWishlist
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-white text-rose-600 border-gray-200"
                }`}
              >
                {inWishlist ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
              </button>

              <button
                onClick={handleCart}
                aria-label="Add to cart"
                className={`p-2 rounded-full border transition-all hover:scale-110 ${
                  inCart
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-emerald-600 border-gray-200"
                }`}
              >
                {inCart ? <FaShoppingCart size={18} /> : <FaCartPlus size={18} />}
              </button>
            </div>
          </div>

          {/* Price + % OFF */}
          <div className="mt-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-800">
                {currency}
                {finalPrice}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {currency}
                  {originalPrice}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p className="text-xs font-medium text-green-600 mt-1">
                {discount}% OFF
              </p>
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
