// import Notification from "../models/Notification.js";
// // Get notifications for a user
// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching notifications" });
//   }
// };

// // Mark notification as read
// export const markAsRead = async (req, res) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
//     res.json({ message: "Notification marked as read" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating notification" });
//   }
// };
import Notification from "../models/Notification.js";

// ✅ Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20); // Limit to the latest 20 notifications

    res.status(200).json(notifications);
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// ✅ Mark a single notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params; // Get notification ID from request
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("❌ Error marking notification as read:", error);
    res.status(500).json({ message: "Error updating notification", error });
  }
};

// ✅ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user.id, isRead: false }, { isRead: true });

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("❌ Error marking all notifications as read:", error);
    res.status(500).json({ message: "Error updating notifications", error });
  }
};

// ✅ Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await notification.deleteOne();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting notification:", error);
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

// ✅ Delete all notifications for a user
export const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user.id });

    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting all notifications:", error);
    res.status(500).json({ message: "Error deleting notifications", error });
  }
};

