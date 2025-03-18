import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
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
          <Link to="/create" style={navLinkStyle}>Create Event</Link>
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
