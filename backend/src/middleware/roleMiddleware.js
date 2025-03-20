export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: "Access Denied: No role assigned" });
      }
  
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient permissions" });
      }
  
      next();
    };
  };
  