import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";

const MyEnrollments = () => {
  const {
    userData,
    enrolledCourses,
    fetchUserEnrolledCourses,
    navigate,
    backendUrl,
    getToken,
    calculateCourseDuration,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressData] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totalLectures, lectureCompleted };
        })
      );

      setProgressData(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) fetchUserEnrolledCourses();
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) getCourseProgress();
  }, [enrolledCourses]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow md:px-36 px-6 pt-10 pb-16">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
              alt="No Enrollments"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No Enrollments Yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Explore courses and start learning today!
            </p>
          </div>
        ) : (
          <table className="md:table-auto table-fixed w-full border mt-10 overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Course</th>
                <th className="px-4 py-3 font-semibold truncate max-sm:hidden">
                  Duration
                </th>
                <th className="px-4 py-3 font-semibold truncate max-sm:hidden">
                  Completed
                </th>
                <th className="px-4 py-3 font-semibold truncate">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {enrolledCourses.map((course, index) => (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className="w-14 sm:w-24 md:w-28 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="mb-1 max-sm:text-sm font-medium text-gray-800">
                        {course.courseTitle}
                      </p>
                      <Line
                        className="bg-gray-300 rounded-full"
                        strokeWidth={2}
                        percent={
                          progressArray[index]
                            ? (progressArray[index].lectureCompleted * 100) /
                              progressArray[index].totalLectures
                            : 0
                        }
                        strokeColor="#2563eb"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {calculateCourseDuration(course)}
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {progressArray[index] &&
                      `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                    <span className="text-xs ml-2">Lectures</span>
                  </td>
                  <td className="px-4 py-3 max-sm:text-right">
                    <button
                      onClick={() => navigate("/player/" + course._id)}
                      className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 text-sm"
                    >
                      {progressArray[index] &&
                      progressArray[index].lectureCompleted /
                        progressArray[index].totalLectures ===
                        1
                        ? "Completed"
                        : "On Going"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyEnrollments;
