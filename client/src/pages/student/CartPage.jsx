import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";

const CartPage = () => {
  const { cart = [], fetchCart, removeCourseFromCart, calculateRating } =
    useContext(AppContext);

  useEffect(() => {
    fetchCart?.();
  }, []);

  const currency = "$";

  // ✅ Calculate subtotal
  const subtotal = cart.reduce((acc, course) => {
    const price =
      course.discount > 0
        ? course.coursePrice - (course.discount * course.coursePrice) / 100
        : course.coursePrice;
    return acc + price;
  }, 0);

  // ✅ Razorpay Checkout Link
  const handleCheckout = () => {
    window.open("https://rzp.io/l/8SjZQ5sW", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My Cart 🛒
        </h2>

        {cart?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">
            <p>Your cart is empty.</p>
            <p className="text-sm text-gray-400 mt-2">
              Add some courses to your cart to see them here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ✅ Left Section: Course List */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((course) => {
                console.log("🧩 Cart course data:", course);

                const courseDomain =
                  course.courseDomain || course.domain || "General";

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
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      {/* Thumbnail */}
                      <img
                        src={
                          course.courseThumbnail ||
                          "https://via.placeholder.com/400x200"
                        }
                        alt={course.courseTitle}
                        className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded-md"
                      />

                      {/* ✅ Course Info */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                          {course.courseTitle}
                        </h3>

                        <p className="text-sm text-blue-600 mt-1">
                          🌐 {courseDomain}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center justify-center sm:justify-start mt-2 space-x-1">
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

                        {/* ✅ Price Section */}
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
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

                      {/* ✅ Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
                        <button
                          onClick={() => removeCourseFromCart(course._id)}
                          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-all"
                        >
                          Remove
                        </button>
                        <button
                          onClick={handleCheckout}
                          className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ✅ Right Section: Order Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-28">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Discount</span>
                <span className="text-green-600">
                  {currency}
                  {(
                    cart.reduce(
                      (acc, course) =>
                        acc + (course.coursePrice * course.discount) / 100,
                      0
                    ) || 0
                  ).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
                <span>Total</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
