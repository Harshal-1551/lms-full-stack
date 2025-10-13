import User from "../models/User.js";

// 🛡️ Check if logged-in user has required role
export const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userId = req.auth.userId; // Clerk auth middleware gives this
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      if (user.role !== requiredRole) {
        return res.status(403).json({ success: false, message: `Access denied: ${requiredRole} role required` });
      }

      next();
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
};
