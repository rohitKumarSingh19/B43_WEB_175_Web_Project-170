

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

function Header({ isAuthenticated, onLogout }: HeaderProps) {
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
        <Box>
          <Link to="/" style={navLinkStyle}>Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create" style={navLinkStyle}>Create Event</Link>
              <Button onClick={onLogout} sx={{ color: "white", marginLeft: "20px" }}>
                Logout
              </Button>
            </>
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


// import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// function Header() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     navigate("/login");
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
//         <Box>
//           <Link to="/" style={navLinkStyle}>Home</Link>
//           {isAuthenticated ? (
//             <>
//               <Link to="/create" style={navLinkStyle}>Create Event</Link>
//               <Button onClick={handleLogout} sx={{ color: "white", marginLeft: "20px" }}>
//                 Logout
//               </Button>
//             </>
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
