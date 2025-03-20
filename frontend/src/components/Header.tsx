import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ Define props interface
interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

function Header({ isAuthenticated, onLogout }: HeaderProps) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [isAuthenticated]); // ✅ Update role when authentication state changes

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

          {/* ✅ Only Organizers and Admins can create events */}
          {isAuthenticated && (role === "organizer" || role === "admin") && (
            <Link to="/create" style={navLinkStyle}>Create Event</Link>
          )}

          {/* ✅ Only Admins can access the Admin Dashboard */}
          {isAuthenticated && role === "admin" && (
            <Link to="/admin" style={navLinkStyle}>Admin Dashboard</Link>
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
