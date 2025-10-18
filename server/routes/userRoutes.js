import express from 'express'
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';
import { updateRoleToAdmin } from "../controllers/userController.js";
import { promoteToAdmin } from "../controllers/userController.js";
import { protectEducator } from "../middlewares/authMiddleware.js";
import { requireAuth } from '@clerk/express';


const userRouter = express.Router()

// Get user Data
userRouter.get("/data", requireAuth(), getUserData);
userRouter.post("/purchase", requireAuth(), purchaseCourse);
userRouter.get("/enrolled-courses", requireAuth(), userEnrolledCourses);
userRouter.post("/update-course-progress", requireAuth(), updateUserCourseProgress);
userRouter.post("/get-course-progress", requireAuth(), getUserCourseProgress);
userRouter.post("/add-rating", requireAuth(), addUserRating);

userRouter.post("/promote", protectEducator, promoteToAdmin);
userRouter.post("/update-role", updateRoleToAdmin);

export default userRouter;