import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

// ✅ Update role to educator
export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!courseData) {
      console.log("No course data received");
      return res.json({ success: false, message: "Course data missing" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    // Parse course data
    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    console.log("Received courseData:", parsedCourseData); // <--- here

    // ✅ Ensure domain is always valid
parsedCourseData.domain =
  parsedCourseData.domain && parsedCourseData.domain.trim() !== ""
    ? parsedCourseData.domain
    : "General";

console.log("Domain before saving:", parsedCourseData.domain); // Add this line to debug



    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageFile.path);

    // ✅ Create course with image
    const newCourse = new Course({
      ...parsedCourseData,
      courseThumbnail: uploadResult.secure_url,
    });

    await newCourse.save();

    res.json({ success: true, message: "Course added successfully" });
  } catch (error) {
    console.error("Add course error:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Educator Courses
export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Educator Dashboard Data (Total Earnings, Students, Courses)
export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    // Calculate total earnings from completed purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // Get enrolled students with course titles
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        { _id: { $in: course.enrolledStudents } },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Enrolled Students Data (with Purchase Info)
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;

    // Fetch all courses by the educator
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    // Fetch purchases with populated course and user
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
