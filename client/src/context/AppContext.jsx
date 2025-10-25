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
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const hasFetchedUser = useRef(false);
  const isEducator = role === "educator";
  const isAdmin = role === "admin";

  // =====================================================
  // ✅ Require Login for Sensitive Operations
  // =====================================================
  const requireLogin = () => {
    if (!userData?._id) {
      toast.warning("Please log in to continue!");
      navigate("/login");
      return false;
    }
    return true;
  };

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
  // ✅ Fetch User Enrolled Courses
  // =====================================================
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${backendUrl}/api/user/enrolled-courses`, {
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
      if (data.success) setEnrolledCourses(data.enrolledCourses);
    } catch (err) {
      console.error("Error fetching enrolled courses:", err.message);
    }
  };

  useEffect(() => {
    if (userData?._id) fetchUserEnrolledCourses();
  }, [userData]);

  // =====================================================
  // ✅ Utility Functions
  // =====================================================
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach(
      (lecture) => (time += lecture.lectureDuration)
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) =>
      chapter.chapterContent.forEach(
        (lecture) => (time += lecture.lectureDuration)
      )
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateRating = (course) => {
    if (
      !course ||
      !Array.isArray(course.courseRatings) ||
      course.courseRatings.length === 0
    )
      return 0;
    const total = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return Math.floor(total / course.courseRatings.length);
  };

  const calculateNoOfLectures = (course) => {
    if (!course || !Array.isArray(course.courseContent)) return 0;
    return course.courseContent.reduce(
      (sum, chapter) =>
        sum +
        (Array.isArray(chapter.chapterContent)
          ? chapter.chapterContent.length
          : 0),
      0
    );
  };

  // =====================================================
  // ✅ Fetch Wishlist
  // =====================================================
  const fetchWishlist = async () => {
    if (!requireLogin()) return;
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("fetchWishlist error:", err.message || err);
    }
  };

  // Toggle wishlist (add/remove)
  const toggleWishlist = async (courseId, addWhenNotFound = true) => {
    if (!requireLogin()) return;
    try {
      const token = await getToken();
      const exists = wishlist.some((c) => String(c._id) === String(courseId));

      if (exists) {
        await axios.post(
          `${backendUrl}/api/user/wishlist/remove`,
          { courseId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlist((prev) =>
          prev.filter((c) => String(c._id) !== String(courseId))
        );
      } else if (addWhenNotFound) {
        await axios.post(
          `${backendUrl}/api/user/wishlist/add`,
          { courseId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const { data } = await axios.get(`${backendUrl}/api/course/${courseId}`);
        if (data.success) {
          setWishlist((prev) => [...prev, data.courseData]);
        } else {
          fetchWishlist();
        }
      }
    } catch (err) {
      console.error("toggleWishlist error:", err);
    }
  };

  // =====================================================
  // ✅ Fetch Cart
  // =====================================================
  const fetchCart = async () => {
    if (!requireLogin()) return;
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setCart(data.cart || []);
    } catch (err) {
      console.error("fetchCart error:", err);
    }
  };

  const addCourseToCart = async (courseId) => {
    if (!requireLogin()) return;
    try {
      const token = await getToken();
      await axios.post(
        `${backendUrl}/api/user/cart/add`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = await axios.get(`${backendUrl}/api/course/${courseId}`);
      if (data.success)
        setCart((prev) => {
          if (prev.some((c) => String(c._id) === String(courseId))) return prev;
          return [...prev, data.courseData];
        });
    } catch (err) {
      console.error("addCourseToCart error:", err);
    }
  };

  const removeCourseFromCart = async (courseId) => {
    if (!requireLogin()) return;
    try {
      const token = await getToken();
      await axios.post(
        `${backendUrl}/api/user/cart/remove`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart((prev) => prev.filter((c) => String(c._id) !== String(courseId)));
    } catch (err) {
      console.error("removeCourseFromCart error:", err);
    }
  };

  // =====================================================
  // ✅ Initial Data Load
  // =====================================================
  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
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

  useEffect(() => {
    if (userData?._id) {
      fetchWishlist();
      fetchCart();
    } else {
      setWishlist([]);
      setCart([]);
    }
  }, [userData]);

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
    wishlist,
    fetchWishlist,
    toggleWishlist,
    cart,
    fetchCart,
    addCourseToCart,
    removeCourseFromCart,
    requireLogin,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
