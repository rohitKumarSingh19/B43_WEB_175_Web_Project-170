// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// // ✅ Define props interface
// interface HeaderProps {
//   isAuthenticated: boolean;
//   onLogout: () => void;
// }

// function Header({ isAuthenticated, onLogout }: HeaderProps) {
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     setRole(localStorage.getItem("role"));
//   }, [isAuthenticated]); // ✅ Update role when authentication state changes

//   return (
//     <AppBar position="static" color="primary" sx={{ padding: "5px 20px" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
//         {/* Left Section: Logo and Title */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <img
//             src="/src/assets/project-logo.png"
//             alt="Logo"
//             width="50"
//             height="50"
//             style={{ borderRadius: "50%", marginRight: "10px" }}
//           />
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Event Management
//           </Typography>
//         </Box>

//         {/* Right Section: Navigation Links */}
//         <Box>
//           <Link to="/" style={navLinkStyle}>Home</Link>

//           {/* ✅ Only Organizers and Admins can create events */}
//           {isAuthenticated && (role === "organizer" || role === "admin") && (
//             <Link to="/create" style={navLinkStyle}>Create Event</Link>
//           )}

//           {/* ✅ Only Admins can access the Admin Dashboard */}
//           {isAuthenticated && role === "admin" && (
//             <Link to="/admin" style={navLinkStyle}>Admin Dashboard</Link>
//           )}

//           {isAuthenticated ? (
//             <Button onClick={onLogout} sx={{ color: "white", marginLeft: "20px" }}>
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Link to="/login" style={navLinkStyle}>Login</Link>
//               <Link to="/register" style={navLinkStyle}>Register</Link>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// // Custom Styles for Links
// const navLinkStyle = {
//   color: "white",
//   marginLeft: "20px",
//   textDecoration: "none",
//   fontSize: "18px",
//   fontWeight: "500",
// };

// export default Header;


// import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { getNotifications } from "../api/notificationApi"; // ✅ Import Notification API

// // ✅ Define props interface (Removed children)
// interface HeaderProps {
//   isAuthenticated: boolean;
//   onLogout: () => void;
//   notifications?:number
// }

// function Header({ isAuthenticated, onLogout }: HeaderProps) {
//   const [role, setRole] = useState<string | null>(null);
//   const [notifications, setNotifications] = useState<number>(0);

//   useEffect(() => {
//     setRole(localStorage.getItem("role"));
    
//     // ✅ Fetch notifications only if authenticated
//     if (isAuthenticated) {
//       fetchNotifications();
//     }
//   }, [isAuthenticated]);

//   const fetchNotifications = async () => {
//     try {
//       const data = await getNotifications();
//       setNotifications(data.length);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   return (
//     <AppBar position="static" color="primary" sx={{ padding: "5px 20px" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
//         {/* Left Section: Logo and Title */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <img
//             src="/src/assets/project-logo.png"
//             alt="Logo"
//             width="50"
//             height="50"
//             style={{ borderRadius: "50%", marginRight: "10px" }}
//           />
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Event Management
//           </Typography>
//         </Box>

//         {/* Right Section: Navigation Links */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Link to="/" style={navLinkStyle}>Home</Link>

//           {/* ✅ Only Organizers and Admins can create events */}
//           {isAuthenticated && (role === "organizer" || role === "admin") && (
//             <Link to="/create" style={navLinkStyle}>Create Event</Link>
//           )}

//           {/* ✅ Only Admins can access the Admin Dashboard */}
//           {isAuthenticated && role === "admin" && (
//             <Link to="/admin" style={navLinkStyle}>Admin Dashboard</Link>
//           )}

//           {/* ✅ Notification Bell Icon */}
//           {isAuthenticated && (
//             <IconButton color="inherit" sx={{ marginLeft: "20px" }}>
//               <Badge badgeContent={notifications} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           )}

//           {isAuthenticated ? (
//             <Button onClick={onLogout} sx={{ color: "white", marginLeft: "20px" }}>
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Link to="/login" style={navLinkStyle}>Login</Link>
//               <Link to="/register" style={navLinkStyle}>Register</Link>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// // Custom Styles for Links
// const navLinkStyle = {
//   color: "white",
//   marginLeft: "20px",
//   textDecoration: "none",
//   fontSize: "18px",
//   fontWeight: "500",
// };

//export default Header;

import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";

// ✅ Define props interface
interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
  notifications?: number; // ✅ Accept notifications as a prop
}

function Header({ isAuthenticated, onLogout, notifications }: HeaderProps) {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [isAuthenticated]);

  return (
    <AppBar position="static" color="primary" sx={{ padding: "5px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Section: Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/src/assets/project-logo.png"
            alt="Logo"
            width="50"
            height="50"
            style={{ borderRadius: "50%", marginRight: "10px" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Event Management
          </Typography>
        </Box>

        {/* Right Section: Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={navLinkStyle}>Home</Link>

          {isAuthenticated && (role === "organizer" || role === "admin") && (
            <Link to="/create" style={navLinkStyle}>Create Event</Link>
          )}

          {isAuthenticated && role === "admin" && (
            <Link to="/admin" style={navLinkStyle}>Admin Dashboard</Link>
          )}

          {/* ✅ Notification Bell Icon */}
          {isAuthenticated && (
            <IconButton color="inherit" onClick={() => navigate("/notifications")}>
              <Badge badgeContent={notifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}

          {isAuthenticated ? (
            <Button onClick={onLogout} sx={{ color: "white", marginLeft: "20px" }}>
              Logout
            </Button>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}>Login</Link>
              <Link to="/register" style={navLinkStyle}>Register</Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Custom Styles for Links
const navLinkStyle = {
  color: "white",
  marginLeft: "20px",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "500",
};

export default Header;

