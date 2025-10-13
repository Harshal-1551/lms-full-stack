import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import stripe from "stripe";

// 🔹 Helper: Check role (admin or user)
const checkRole = async (req, requiredRole) => {
  const userId = req.auth.userId;
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.role !== requiredRole)
    throw new Error(`Access denied: ${requiredRole} role required`);
  return user;
};

// 🧠 Get User Data
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User Not Found" });
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🛒 Purchase Course — Only for users
export const purchaseCourse = async (req, res) => {
  try {
    const user = await checkRole(req, "user");
    const { courseId } = req.body;
    const { origin } = req.headers;

    const courseData = await Course.findById(courseId);
    if (!courseData) return res.json({ success: false, message: "Course Not Found" });

    const purchaseData = {
      courseId: courseData._id,
      userId: user._id,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    // Stripe setup
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLocaleLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: { name: courseData.courseTitle },
          unit_amount: Math.floor(newPurchase.amount) * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/loading/my-enrollments`,
      cancel_url: `${origin}/`,
      line_items,
      mode: "payment",
      metadata: { purchaseId: newPurchase._id.toString() },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🎓 User Enrolled Courses
export const userEnrolledCourses = async (req, res) => {
  try {
    const user = await checkRole(req, "user");
    const userData = await User.findById(user._id).populate("enrolledCourses");
    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 📈 Update Course Progress
export const updateUserCourseProgress = async (req, res) => {
  try {
    const user = await checkRole(req, "user");
    const { courseId, lectureId } = req.body;

    const progressData = await CourseProgress.findOne({
      userId: user._id,
      courseId,
    });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({ success: true, message: "Lecture Already Completed" });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId: user._id,
        courseId,
        lectureCompleted: [lectureId],
      });
    }

    res.json({ success: true, message: "Progress Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 📊 Get User Course Progress
export const getUserCourseProgress = async (req, res) => {
  try {
    const user = await checkRole(req, "user");
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({
      userId: user._id,
      courseId,
    });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ⭐ Add User Ratings
export const addUserRating = async (req, res) => {
  try {
    const user = await checkRole(req, "user");
    const { courseId, rating } = req.body;

    if (!courseId || !rating || rating < 1 || rating > 5)
      return res.json({ success: false, message: "Invalid Details" });

    const course = await Course.findById(courseId);
    if (!course) return res.json({ success: false, message: "Course not found" });

    if (!user.enrolledCourses.includes(courseId))
      return res.json({ success: false, message: "User has not purchased this course." });

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId === user._id.toString()
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId: user._id, rating });
    }

    await course.save();
    res.json({ success: true, message: "Rating added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// 👑 Promote a User to Admin (for super-admin or via manual call)
export const updateRoleToAdmin = async (req, res) => {
  try {
    const { userId } = req.body; // Clerk user ID to promote

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    user.role = "admin";
    await user.save();

    res.json({ success: true, message: "User role updated to admin" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
