import User from "../models/User.js";
import Event from "../models/Event.js";
// ✅ Get all users (for admin dashboard)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// ✅ Get all events (for admin dashboard)
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events" });
  }
};
