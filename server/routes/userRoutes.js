import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart,
  addToCart,
  removeFromCart,
  addUserRating,
  getUserCourseProgress,
  getUserData,
  purchaseCourse,
  updateUserCourseProgress,
  userEnrolledCourses,
  updateRoleToAdmin,
  promoteToAdmin,
} from "../controllers/userController.js";

import { protectEducator } from "../middlewares/authMiddleware.js";
import { requireAuth } from "@clerk/express";

const userRouter = express.Router();

// 🔹 Basic user data & purchases
userRouter.get("/data", requireAuth(), getUserData);
userRouter.post("/purchase", requireAuth(), purchaseCourse);
userRouter.get("/enrolled-courses", requireAuth(), userEnrolledCourses);
userRouter.post("/update-course-progress", requireAuth(), updateUserCourseProgress);
userRouter.post("/get-course-progress", requireAuth(), getUserCourseProgress);
userRouter.post("/add-rating", requireAuth(), addUserRating);

//  Admin routes
userRouter.post("/promote", protectEducator, promoteToAdmin);
userRouter.post("/update-role", updateRoleToAdmin);

//  Wishlist routes 
userRouter.get("/wishlist", requireAuth(), getWishlist);
userRouter.post("/wishlist/add", requireAuth(), addToWishlist);
userRouter.post("/wishlist/remove", requireAuth(), removeFromWishlist);

//  Cart routes 
userRouter.get("/cart", requireAuth(), getCart);
userRouter.post("/cart/add", requireAuth(), addToCart);
userRouter.post("/cart/remove", requireAuth(), removeFromCart);

export default userRouter;
