// client/src/context/AppContext.jsx
import axios from "axios";
import { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const [showLogin, setShowLogin] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasFetchedUser = useRef(false); // ✅ Prevent multiple fetches

  const isEducator = role === "educator";
  const isAdmin = role === "admin";

  // =====================================================
  // ✅ Fetch All Public Courses
  // =====================================================
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/all`);
      if (data.success) setAllCourses(data.courses);
      else toast.error(data.message);
    } catch (err) {
      console.error("fetchAllCourses error:", err?.message || err);
      toast.error(err.message || "Unable to fetch courses");
    }
  };

  // =====================================================
  // ✅ Fetch Logged-in User Data + Role
  // =====================================================
  const fetchUserData = async () => {
    try {
      console.log("userData", userData);
      console.log("User", user);
      if (userData && userData.clerkId === user?.id) return;
      if (!user) {
        setUserData(null);
        setRole("user");
        setLoading(false);
        return;
      }
      
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response Data:", data)
      if (data.success && data.user) {
        setUserData(data.user);
        setRole(data.user.role || "user");
      } else {
        setRole("user");
      }
    } catch (err) {
      console.error("fetchUserData error:", err);
      toast.error(err.message || "Error loading user data");
      setRole("user");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // ✅ Fetch Courses User Is Enrolled In
  // =====================================================
     
 const fetchUserEnrolledCourses = async () => {
  try {
    const token = await getToken(); // ✅ get token from Clerk
    const res = await fetch(`${backendUrl}/api/user/enrolled-courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch enrolled courses:", res.status);
      return;
    }

    const data = await res.json();
    if (data.success) {
      setEnrolledCourses(data.enrolledCourses); // ✅ typo fixed (was setUserEnrolledCourses)
    }
  } catch (err) {
    console.error("Error fetching enrolled courses:", err.message);
  }
};



// UseEffect to trigger after userData is loaded
useEffect(() => {
  if (userData?._id) {
    fetchUserEnrolledCourses();
  }
}, [userData]);


  // =====================================================
  // ✅ Utility Functions
  // =====================================================
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateRating = (course) => {
    if (!course || !Array.isArray(course.courseRatings) || course.courseRatings.length === 0)
      return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return Math.floor(total / course.courseRatings.length);
  };

  const calculateNoOfLectures = (course) => {
    if (!course || !Array.isArray(course.courseContent)) return 0;
    return course.courseContent.reduce(
      (sum, chapter) =>
        sum + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0),
      0
    );
  };

  // =====================================================
  // ✅ Initial Load (Public Data)
  // =====================================================
  useEffect(() => {
    fetchAllCourses();
  }, []);

  // =====================================================
  // ✅ Load user data once after Clerk is ready
  // =====================================================
  
  useEffect(() => {
  if (!isLoaded) return;

  // prevent re-fetching if user already loaded once in this session
  if (hasFetchedUser.current && userData) return;

  const loadUserData = async () => {
    try {
      setLoading(true);
      await fetchUserData();
      hasFetchedUser.current = true;
    } catch (err) {
      console.error("Error loading user data:", err);
    } finally {
      setLoading(false);
    }
  };

  loadUserData();
}, [isLoaded]);



  // =====================================================
  // ✅ Fetch enrolled courses once userData available
  // =====================================================
  useEffect(() => {
  if (userData?._id) {
    fetchUserEnrolledCourses(userData._id);
  }
}, [userData]);


  // =====================================================
  // ✅ Spinner only for first load (not for every page)
  // =====================================================
  // if (loading && !userData) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-white"></div>
  //     </div>
  //   );
  // }

  // =====================================================
  // ✅ Context Value
  // =====================================================
  const value = {
    showLogin,
    setShowLogin,
    backendUrl,
    currency,
    navigate,
    userData,
    setUserData,
    getToken,
    allCourses,
    fetchAllCourses,
    enrolledCourses,
    fetchUserEnrolledCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateRating,
    calculateNoOfLectures,
    role,
    setRole,
    loading,
    setLoading,
    isEducator,
    isAdmin,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
