import React, { useContext } from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import Navbar from './components/student/Navbar';
import Home from './pages/student/Home';
import CourseDetails from './pages/student/CourseDetails';
import CoursesList from './pages/student/CoursesList';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Educator from './pages/educator/Educator';
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Player from './pages/student/Player';
import MyEnrollments from './pages/student/MyEnrollments';
import Loading from './components/student/Loading';
import { AppContext } from './context/AppContext';

const App = () => {
  const { role } = useContext(AppContext);
  const isEducatorRoute = useMatch('/educator/*');

  // ✅ Protect educator pages
  const EducatorRoute = ({ children }) => {
    if (role === 'educator' || role === 'admin') return children;
    return <Navigate to="/" replace />;
  };

  // ✅ Protect admin-only pages
  const AdminRoute = ({ children }) => {
    if (role === 'admin') return children;
    return <Navigate to="/" replace />;
  };

  // ✅ Protect user pages (like enrollments)
  const UserRoute = ({ children }) => {
    if (role === 'user' || role === 'admin') return children;
    return <Navigate to="/" replace />;
  };

  return (
    <div>
      <ToastContainer />
      {/* Student Navbar only for non-educator routes */}
      {!isEducatorRoute && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* User-only routes */}
        <Route
          path="/my-enrollments"
          element={
            <UserRoute>
              <MyEnrollments />
            </UserRoute>
          }
        />
        <Route
          path="/player/:courseId"
          element={
            <UserRoute>
              <Player />
            </UserRoute>
          }
        />

        {/* Educator/Admin-only routes */}
        <Route
          path="/educator"
          element={
            <EducatorRoute>
              <Educator />
            </EducatorRoute>
          }
        >
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>

        {/* Example admin-only route (if added later) */}
        {/* <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> */}
      </Routes>
    </div>
  );
};

export default App;
