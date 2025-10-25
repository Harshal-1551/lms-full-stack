import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";

const CourseList = () => {
  const {
    allCourses,
    wishlist = [],
    cart = [],
    toggleWishlist,
    addCourseToCart,
    removeCourseFromCart,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const domains = React.useMemo(() => {
    if (!allCourses) return [];
    const uniqueDomains = [
      ...new Set(allCourses.map((course) => course.domain).filter(Boolean)),
    ];
    return uniqueDomains.sort();
  }, [allCourses]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      setIsLoading(true);

      let tempCourses = [...allCourses];

      if (searchInput) {
        tempCourses = tempCourses.filter(
          (item) =>
            item.courseTitle
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            item.courseDescription
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        );
      }

      if (selectedDomain) {
        tempCourses = tempCourses.filter(
          (item) =>
            item.domain &&
            item.domain.toLowerCase() === selectedDomain.toLowerCase()
        );
      }

      setFilteredCourses(tempCourses);
      setIsLoading(false);
    }
  }, [allCourses, searchInput, selectedDomain]);

  const clearFilters = () => {
    setSearchInput("");
    setSelectedDomain("");
  };

  const currency = "$"; // USD

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Projects Catalog
          </h1>
          <p className="text-lg text-gray-600">
            Discover comprehensive projects to advance your skills
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search projects by title or description..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* Domain Filter */}
              <div className="flex gap-3 items-center">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 min-w-[200px]"
                >
                  <option value="">All Domains</option>
                  {domains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>

                {(searchInput || selectedDomain) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500 whitespace-nowrap">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "project" : "projects"} found
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses && filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              const discount = Number(course.discount) || 0;
              const price = Number(course.coursePrice) || 0;
              const finalPrice =
                discount > 0
                  ? (price - (discount * price) / 100).toFixed(2)
                  : price.toFixed(2);
              const originalPrice =
                discount > 0 ? price.toFixed(2) : null;

              const inWishlist = (wishlist ?? []).some(
                (c) => String(c._id) === String(course._id)
              );
              const inCart = (cart ?? []).some(
                (c) => String(c._id) === String(course._id)
              );

              return (
                <motion.div
                  key={course._id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 hover:border-blue-100 flex flex-col cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        🌐 {course.domain || "General"}
                      </span>

                      {/* Wishlist & Cart Icons */}
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist?.(course._id);
                          }}
                          className={`p-2 rounded-full border transition-all hover:scale-110 ${
                            inWishlist
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-white text-rose-600 border-gray-200"
                          }`}
                        >
                          {inWishlist ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            inCart
                              ? removeCourseFromCart?.(course._id)
                              : addCourseToCart?.(course._id);
                          }}
                          className={`p-2 rounded-full border transition-all hover:scale-110 ${
                            inCart
                              ? "bg-emerald-500 text-white border-emerald-500"
                              : "bg-white text-emerald-600 border-gray-200"
                          }`}
                        >
                          {inCart ? <FaShoppingCart size={16} /> : <FaCartPlus size={16} />}
                        </button>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600">
                      {course.courseTitle}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
                      {course.courseDescription}
                    </p>

                    {/* Price */}
                    <div className="flex flex-col gap-1 mt-auto">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          {currency}
                          {finalPrice}
                        </span>
                        {originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {currency}
                            {originalPrice}
                          </span>
                        )}
                      </div>
                      {discount > 0 && (
                        <p className="text-xs font-medium text-green-600">
                          {discount}% OFF
                        </p>
                      )}
                    </div>

                    {/* View More Details */}
                    {course.pdfLink && (
                      <a
                        href={course.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-4 w-full inline-block text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View More Details
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500">
              {searchInput || selectedDomain
                ? "Try adjusting your search or filter criteria"
                : "No courses available at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
