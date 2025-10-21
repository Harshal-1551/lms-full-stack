import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

const WishlistPage = () => {
  const { wishlist = [], fetchWishlist, addCourseToCart, toggleWishlist, calculateRating } =
    useContext(AppContext);

  useEffect(() => {
    fetchWishlist?.();
  }, []);

  const currency = "$";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Wishlist ❤️
        </h2>

        {wishlist?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            <p>Your wishlist is empty.</p>
            <p className="text-sm text-gray-400 mt-2">
              Like a project to see it here ❤️
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((course) => {
              const courseDomain = course.courseDomain || course.domain || "General";
              const finalPrice =
                course.discount > 0
                  ? (
                      course.coursePrice -
                      (course.discount * course.coursePrice) / 100
                    ).toFixed(2)
                  : course.coursePrice.toFixed(2);

              const rating = calculateRating ? calculateRating(course) : 0;

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={
                      course.courseThumbnail ||
                      "https://via.placeholder.com/400x200"
                    }
                    alt={course.courseTitle}
                    className="w-full h-40 object-cover rounded-md"
                  />

                  {/* Course Info */}
                  <div className="mt-3 flex flex-col justify-between flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {course.courseTitle}
                    </h3>

                    <p className="text-sm text-blue-600 mt-1">
                      🌐 {courseDomain}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-start mt-2 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={
                            i < Math.floor(rating)
                              ? assets.star
                              : assets.star_blank
                          }
                          alt="star"
                          className="w-4 h-4"
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({course.courseRatings?.length || 0})
                      </span>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-blue-600">
                        {currency}
                        {finalPrice}
                      </span>
                      {course.discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            {currency}
                            {course.coursePrice}
                          </span>
                          <span className="text-xs text-green-600 font-medium">
                            {course.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center gap-3 mt-4">
                    <button
                      onClick={() => addCourseToCart(course._id)}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(course._id)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow hover:bg-gray-300 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
