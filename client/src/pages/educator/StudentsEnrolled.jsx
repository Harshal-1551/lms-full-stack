import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { motion } from "framer-motion";
import SideBar from "../../components/educator/SideBar";

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn("No token found, skipping enrolled students fetch.");
        setLoading(false);
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/educator/enrolled-students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.warn(data.message || "No enrolled students found.");
        setEnrolledStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to load enrolled students: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEducator !== undefined) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  // Show loader until API completes
  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen">

      <div className="flex-1 flex flex-col items-center justify-start md:p-8 p-4 pt-12 bg-gray-50">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
        >
          Students Enrolled
        </motion.h1>

        {enrolledStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-600">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
              alt="No Enrollments"
              className="w-24 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No Students Enrolled Yet</p>
            <p className="text-sm text-gray-500 mt-1">
              Once students enroll in your courses, they’ll appear here.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl overflow-x-auto"
          >
            <table className="w-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-300">
              <thead className="bg-gray-100 text-gray-800 text-left text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course Title</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {enrolledStudents.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt={item.student.name}
                        className="w-10 h-10 rounded-full border border-gray-200"
                      />
                      <span className="truncate font-medium">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {new Date(item.purchaseDate).toLocaleDateString()}
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

export default StudentsEnrolled;
