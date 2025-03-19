import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// User Registration
export const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Validate Inputs
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });
  
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create User
      user = new User({ name, email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ message: "Server Error", error });
    }
  };
// User Login
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Validate Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };