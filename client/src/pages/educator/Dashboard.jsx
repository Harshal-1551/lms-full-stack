import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { backendUrl, isEducator, currency, getToken } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    students: 0,
    courses: 0,
    earnings: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Animate numbers when data loads
  useEffect(() => {
    if (dashboardData) {
      const duration = 1200;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);

        setAnimatedValues({
          students: Math.floor(
            progress * dashboardData.enrolledStudentsData.length
          ),
          courses: Math.floor(progress * dashboardData.totalCourses),
          earnings: Math.floor(progress * dashboardData.totalEarnings),
        });

        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [dashboardData]);

  useEffect(() => {
    if (isEducator) fetchDashboardData();
  }, [isEducator]);

  return dashboardData ? (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start md:p-8 md:pb-0 p-4 pt-8 pb-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="space-y-10 w-full max-w-6xl flex flex-col items-center">
        {/* Top Stats Section */}
        <motion.div
          className="flex flex-wrap gap-8 justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            {
              icon: assets.patients_icon,
              label: "Total Enrolments",
              value: animatedValues.students,
              gradient: "from-cyan-500 via-blue-500 to-indigo-500",
            },
            {
              icon: assets.appointments_icon,
              label: "Total Projects",
              value: animatedValues.courses,
              gradient: "from-purple-500 via-pink-500 to-rose-500",
            },
            {
              icon: assets.earning_icon,
              label: "Total Earnings",
              value: `${currency}${animatedValues.earnings}`,
              gradient: "from-emerald-500 via-teal-500 to-cyan-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center gap-4 w-64 p-5 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              whileHover={{ scale: 1.03 }}
            >
              <motion.img
                src={stat.icon}
                alt={stat.label}
                className="w-12 h-12 z-10"
                whileHover={{ rotate: 10, scale: 1.1 }}
              />
              <div className="z-10">
                <motion.p
                  className="text-3xl font-semibold tracking-tight"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm opacity-90 font-medium">{stat.label}</p>
              </div>
              <motion.div
                className="absolute inset-0 bg-white/10 blur-2xl rounded-2xl"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Latest Enrollments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-4xl flex flex-col items-center"
        >
          <h2 className="pb-4 text-xl font-semibold text-gray-800 text-center">
            Latest Enrolments
          </h2>
          <div className="w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
            <table className="table-fixed md:table-auto w-full">
              <thead className="text-gray-900 border-b border-gray-300 text-sm text-left bg-gray-50/80">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                    #
                  </th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      />
                      <span className="truncate font-medium text-gray-800">
                        {item.student.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 truncate font-medium text-gray-700">
                      {item.courseTitle}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
