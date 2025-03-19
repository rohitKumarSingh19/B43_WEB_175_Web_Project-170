// import jwt from 'jsonwebtoken';
// export const protect=(req,res,next)=>{
//     try{
//         const token=req.header('Authorization');
//         if(!token) return res.status(401).json({
//             message:'Access Denied'
//         });
//     const verified=jwt.verify(token,process.env.JWT_SECRET);
//     req.user=verified;
//     next();
//     }catch(error){
//         res.status(400).json({
//             message:'Invalid Token'
//         })
//     }
// }

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user data to request
    next(); // Move to the next middleware
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      return res.status(500).json({ message: "Authentication Error", error: error.message });
    }
  }
};
