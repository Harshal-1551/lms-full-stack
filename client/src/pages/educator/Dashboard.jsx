import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const statCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// Memoized stat card
const StatCard = React.memo(({ stat }) => (
  <motion.div
    className={`relative flex items-center gap-4 w-64 p-5 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg overflow-hidden`}
    variants={statCardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
  >
    <motion.img
      src={stat.icon}
      alt={stat.label}
      className="w-12 h-12 z-10"
      whileHover={{ rotate: 5, scale: 1.05, transition: { duration: 0.2 } }}
    />
    <div className="z-10">
      <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
      <p className="text-sm opacity-90 font-medium">{stat.label}</p>
    </div>
    <div className="absolute inset-0 bg-white/10 blur-2xl rounded-2xl" />
  </motion.div>
));

// Memoized enrollment row
const EnrollmentRow = React.memo(({ item, index }) => (
  <motion.tr
    variants={rowVariants}
    initial="hidden"
    animate="visible"
    custom={index}
    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
  >
    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
      <motion.img
        src={item.student.imageUrl || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-9 h-9 rounded-full object-cover border border-gray-200"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="truncate font-medium text-gray-800">{item.student.name}</span>
    </td>
    <td className="px-4 py-3 truncate font-medium text-gray-700">{item.courseTitle}</td>
  </motion.tr>
));

const Dashboard = () => {
  const { backendUrl, isEducator, currency, getToken, role } = useContext(AppContext);

  // Unconditional hooks
  const [dashboardData, setDashboardData] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({ students: 0, courses: 0, earnings: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Safe derived values
  const enrolledStudentsData = dashboardData?.enrolledStudentsData || [];
  const totalCourses = dashboardData?.totalCourses || 0;
  const totalEarnings = dashboardData?.totalEarnings || 0;

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success && data.dashboardData) {
        setDashboardData(data.dashboardData);
        localStorage.setItem("dashboardData", JSON.stringify(data.dashboardData));
        localStorage.setItem("dashboardDataTimestamp", Date.now().toString());
        setHasAnimated(false);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to fetch dashboard data");
    }
  }, [backendUrl, getToken]);

  useEffect(() => {
    if (isEducator || role === "admin") fetchDashboardData();
  }, [isEducator, role, fetchDashboardData]);

  // Stats configuration
  const statsConfig = useMemo(() => [
    {
      icon: assets.patients_icon,
      label: "Total Enrollments",
      value: animatedValues.students || enrolledStudentsData.length,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: assets.appointments_icon,
      label: "Total Projects",
      value: animatedValues.courses || totalCourses,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
    },
    {
      icon: assets.earning_icon,
      label: "Total Earnings",
      value: currency + (animatedValues.earnings || totalEarnings),
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
  ], [animatedValues, enrolledStudentsData.length, totalCourses, totalEarnings, currency]);

  // Animate numbers once
  useEffect(() => {
    if (!dashboardData || hasAnimated) return;
    const duration = 1500;
    const start = Date.now();

    let animationFrameId;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        students: Math.floor(easeOut * enrolledStudentsData.length),
        courses: Math.floor(easeOut * totalCourses),
        earnings: Math.floor(easeOut * totalEarnings),
      });

      if (progress < 1) animationFrameId = requestAnimationFrame(animate);
      else setHasAnimated(true);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dashboardData, hasAnimated, enrolledStudentsData.length, totalCourses, totalEarnings]);

  if (!dashboardData) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <motion.div className="flex-1 flex flex-col items-center justify-start md:p-8 p-4 pt-8 pb-0">
        <div className="space-y-10 w-full max-w-6xl flex flex-col items-center">
          {/* Top Stats */}
          <motion.div className="flex flex-wrap gap-8 justify-center items-center">
            {statsConfig.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </motion.div>

          {/* Latest Enrollments Table */}
          <motion.div className="w-full max-w-4xl flex flex-col items-center">
            <h2 className="pb-4 text-xl font-semibold text-gray-800 text-center">
              Latest Enrollments
            </h2>
            <div className="w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-md">
              <table className="table-fixed md:table-auto w-full">
                <thead className="text-gray-900 border-b border-gray-300 text-sm text-left bg-gray-50/80">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                    <th className="px-4 py-3 font-semibold">Student Name</th>
                    <th className="px-4 py-3 font-semibold">Project Title</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600">
                  {enrolledStudentsData.map((item, index) => (
                    <EnrollmentRow key={`${item.student.id}-${item.courseTitle}-${index}`} item={item} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Dashboard);
