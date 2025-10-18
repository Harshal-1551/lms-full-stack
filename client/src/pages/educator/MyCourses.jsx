import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { motion } from "framer-motion";
import SideBar from "../../components/educator/SideBar";

const MyCourses = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn("No token found, skipping course fetch.");
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCourses(data.courses);
      } else {
        setCourses([]);
        toast.warn("No courses found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load courses: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEducator !== undefined) {
      fetchEducatorCourses();
    }
  }, [isEducator]);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 flex flex-col items-center md:p-8 p-4 pt-8 bg-gray-50">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
          My Projects
        </h2>

        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
              alt="No Courses"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No Courses Found</p>
            <p className="text-sm text-gray-500 mt-1">
              You haven’t created any courses yet.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-200"
          >
            <table className="w-full table-auto text-left">
              <thead className="text-gray-900 border-b border-gray-300 text-sm md:text-base">
                <tr>
                  <th className="px-4 py-3 font-semibold truncate">All Courses</th>
                  <th className="px-4 py-3 font-semibold truncate">Earnings</th>
                  <th className="px-4 py-3 font-semibold truncate">Students</th>
                  <th className="px-4 py-3 font-semibold truncate">Published On</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm md:text-base">
                {courses.map((course, index) => (
                  <motion.tr
                    key={course._id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={course.courseThumbnail}
                        alt="Course"
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                      <span className="truncate hidden md:block font-medium">
                        {course.courseTitle}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {currency}{" "}
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice -
                            (course.discount * course.coursePrice) / 100)
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {course.enrolledStudents.length}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
