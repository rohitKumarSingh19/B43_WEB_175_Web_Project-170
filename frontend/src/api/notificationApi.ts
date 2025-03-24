import axios from "axios";
const API_URL = "https://event-management-xc6u.onrender.com/api/notifications";
// Get notifications
export const getNotifications = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
// Mark notification as read
export const markAsRead = async (notificationId: string) => {
  const token = localStorage.getItem("token");
  await axios.put(`${API_URL}/${notificationId}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
};
