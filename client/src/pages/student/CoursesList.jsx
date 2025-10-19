import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const { allCourses } = useContext(AppContext);
  const navigate = useNavigate();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const domains = React.useMemo(() => {
    if (!allCourses) return [];
    const uniqueDomains = [...new Set(allCourses.map(course => course.domain).filter(Boolean))];
    return uniqueDomains.sort();
  }, [allCourses]);

  useEffect(() => {
    if (allCourses) {
      console.log(
        "All Courses:",
        allCourses.map(c => ({ title: c.courseTitle, domain: c.domain }))
      );
    }
  }, [allCourses]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      setIsLoading(true);

      let tempCourses = allCourses.slice();

      if (searchInput) {
        tempCourses = tempCourses.filter((item) =>
          item.courseTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.courseDescription.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (selectedDomain) {
        tempCourses = tempCourses.filter(
          (item) => item.domain && item.domain.toLowerCase() === selectedDomain.toLowerCase()
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Catalog</h1>
          <p className="text-lg text-gray-600">Discover comprehensive courses to advance your skills</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search courses by title or description..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-colors duration-200"
                />
              </div>

              <div className="flex gap-3 items-center">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="border border-gray-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 min-w-[200px] transition-colors duration-200"
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
                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500 whitespace-nowrap">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </div>
          </div>
        </div>

        {filteredCourses && filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => {
              // ✅ Calculate discounted price
              const finalPrice = course.discount > 0
                ? (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)
                : course.coursePrice.toFixed(2);

              const originalPrice = course.discount > 0 ? course.coursePrice.toFixed(2) : null;

              return (
                <div
                  key={course._id}
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {course.discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {course.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {course.domain || "General"}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {course.courseTitle}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {course.courseDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">
                          {currency}{finalPrice}
                        </span>
                        {originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {currency}{originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">
                {searchInput || selectedDomain 
                  ? "Try adjusting your search or filter criteria"
                  : "No courses available at the moment"
                }
              </p>
              {(searchInput || selectedDomain) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
