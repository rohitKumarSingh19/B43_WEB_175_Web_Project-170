import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch user from DB and attach to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    req.user = user; // Attach full user object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
//Middleware to restrict access based on roles
export const authorizeRoles=(...allowedRoles)=>{
  return (req,res,next)=>{
    if(!req.user || !allowedRoles.includes(req.user.role)){
      return res.status(403).json({
        message:'Access Denied: Insufficient Permissions'
      });
    }
    next();
  }
}