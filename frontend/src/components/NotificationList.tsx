import { useEffect, useState } from "react";
import { getNotifications, markAsRead } from "../api/notificationApi";
import { List, ListItem, ListItemText, Button } from "@mui/material";

// ✅ Define Notification Type
interface Notification {
  _id: string;
  message: string;
  createdAt: string;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // ✅ Typed state

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data: Notification[] = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id)); // ✅ Update state properly
    } catch (error) {
      console.error("❌ Error marking notification as read:", error);
    }
  };

  return (
    <List>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <ListItem key={notification._id}>
            <ListItemText
              primary={notification.message}
              secondary={new Date(notification.createdAt).toLocaleString()} // ✅ Convert date to readable format
            />
            <Button variant="contained" color="primary" onClick={() => handleMarkAsRead(notification._id)}>
              Mark as Read
            </Button>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No new notifications" />
        </ListItem>
      )}
    </List>
  );
};

export default NotificationList;
