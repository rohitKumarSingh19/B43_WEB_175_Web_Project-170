import Notification from "../models/Notification.js"; 

// ✅ Create a new notification
export const createNotification = async (userId, message) => {
  try {
    const notification = new Notification({ user: userId, message });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw new Error("Failed to create notification");
  }
};

// ✅ Get notifications for a user
export const getUserNotifications = async (userId) => {
  try {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
};

// ✅ Mark notifications as read
export const markNotificationsAsRead = async (userId) => {
  try {
    await Notification.updateMany({ user: userId, read: false }, { read: true });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    throw new Error("Failed to update notifications");
  }
};
