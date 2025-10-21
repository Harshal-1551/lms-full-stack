import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "./context/AppContext";

import Navbar from "./components/common/Navbar";
import Loading from "./components/student/Loading";
import Home from "./pages/student/Home";
import CourseDetails from "./pages/student/CourseDetails";
import CoursesList from "./pages/student/CoursesList";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";

import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import EducatorLayout from "./components/layouts/EducatorLayout";
import WhatsAppButton from "./components/common/WhatsAppButton";
import AboutUs from "./pages/student/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/common/BackButton";
import Contact from "./pages/student/Contact";
import PrivacyPolicy from "./pages/student/PrivacyPolicy";


import WishlistPage from "./pages/student/WishlistPage";
import CartPage from "./pages/student/CartPage";

const ProtectedUserRoute = ({ children }) => {
  const { role, loading } = useContext(AppContext);
  if (loading) return <Loading />;
  return role === "user" || role === "admin" || role === "educator"
    ? children
    : <Navigate to="/" replace />;
};

const ProtectedEducatorRoute = ({ children }) => {
  const { role, loading } = useContext(AppContext);
  if (loading) return <Loading />;

  const isAuthorized = role === "admin" || role === "educator";
  if (!isAuthorized) {
    toast.error("Access denied! You are not an educator.");
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => (
  <>
    <ToastContainer position="top-center" autoClose={2000} />
    <Navbar />
    <ScrollToTop />
    <BackButton />

    <Routes>
      {/* 🌍 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/course-list" element={<CoursesList />} />
      <Route path="/course-list/:input" element={<CoursesList />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* 👩‍🎓 Student Protected Routes */}
      <Route
        path="/my-enrollments"
        element={
          <ProtectedUserRoute>
            <MyEnrollments />
          </ProtectedUserRoute>
        }
      />

      {/* ✅ Wishlist & Cart Routes */}
      <Route
        path="/wishlist"
        element={
          <ProtectedUserRoute>
            <WishlistPage />
          </ProtectedUserRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedUserRoute>
            <CartPage />
          </ProtectedUserRoute>
        }
      />

      <Route
        path="/player/:courseId"
        element={
          <ProtectedUserRoute>
            <Player />
          </ProtectedUserRoute>
        }
      />

      {/* 👨‍🏫 Educator Routes with Sidebar Layout */}
      <Route
        path="/educator"
        element={
          <ProtectedEducatorRoute>
            <EducatorLayout />
          </ProtectedEducatorRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-course" element={<AddCourse />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="student-enrolled" element={<StudentsEnrolled />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    {/* ✅ WhatsApp button visible on all pages */}
    <WhatsAppButton />
  </>
);

export default App;
