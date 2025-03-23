// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import { getNotifications} from "../controllers/notificationController.js";
// const router = express.Router();
// router.get("/", protect, getNotifications);
// // router.put("/:id/read", protect, markAsRead);
// export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} from "../controllers/notificationController.js";

const router = express.Router();

// ✅ Get all notifications for the logged-in user
router.get("/", protect, getNotifications);

// ✅ Mark a single notification as read
router.put("/:id/read", protect, markAsRead);

// ✅ Mark all notifications as read
router.put("/read-all", protect, markAllAsRead);

// ✅ Delete a single notification
router.delete("/:id", protect, deleteNotification);

// ✅ Delete all notifications
router.delete("/delete-all", protect, deleteAllNotifications);

export default router;

