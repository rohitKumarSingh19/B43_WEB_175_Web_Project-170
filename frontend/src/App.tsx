// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import Home from "./pages/Home";
// import EventCreate from "./pages/EventCreate";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import AdminDashboard from "./pages/AdminDashboard";
// // import Banner from './components/Banner';
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [role, setRole] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // ✅ Check auth & role on mount and when localStorage changes
//   useEffect(() => {
//     const updateAuthState = () => {
//       const token = localStorage.getItem("token");
//       const storedRole = localStorage.getItem("role");
//       setIsAuthenticated(!!token);
//       setRole(storedRole);
//     };

//     updateAuthState(); // ✅ Initial state
//     window.addEventListener("storage", updateAuthState); // ✅ Detect login/logout changes

//     return () => window.removeEventListener("storage", updateAuthState);
//   }, []);

//   // ✅ Logout Function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setIsAuthenticated(false);
//     setRole(null);
//     navigate("/login");
//   };

//   return (
//     <Box display="flex" flexDirection="column" minHeight="100vh">
//       <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//       {/* ✅ Banner Component (Only on Home Page) */}
//       {/* <Banner /> */}
//       <Box flexGrow={1}>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           {/* ✅ Only Organizers & Admins can access Create Event */}
//           <Route
//             path="/create"
//             element={isAuthenticated && (role === "organizer" || role === "admin") ? (
//               <EventCreate />
//             ) : (
//               <Login />
//             )}
//           />
// {/* ✅ Only Admins can access Admin Dashboard */}
// <Route
//             path="/admin"
//             element={isAuthenticated && role === "admin" ? (
//               <AdminDashboard />
//             ) : (
//               <Login />
//             )}
//           />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// export default App;


import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Home from "./pages/Home";
import EventCreate from "./pages/EventCreate";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import NotificationList from "./components/NotificationList";
import { getNotifications } from "./api/notificationApi";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(0); // ✅ Store unread notifications count
  const navigate = useNavigate();

  // ✅ Check auth & role on mount
  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      setIsAuthenticated(!!token);
      setRole(storedRole);
    };

    updateAuthState();
    window.addEventListener("storage", updateAuthState);

    return () => window.removeEventListener("storage", updateAuthState);
  }, []);

  // ✅ Fetch Notifications Count
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data.length); // ✅ Store unread notifications count
      } catch (error) {
        console.error("❌ Error fetching notifications:", error);
      }
    };

    if (isAuthenticated) fetchNotifications();
  }, [isAuthenticated]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    setNotifications(0); // ✅ Reset notifications on logout
    navigate("/login");
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* ✅ Header with Notification Icon */}
      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout} 
        notifications={notifications} 
      />

      <Box flexGrow={1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={isAuthenticated && (role === "organizer" || role === "admin") ? (
              <EventCreate />
            ) : (
              <Login />
            )}
          />
          <Route
            path="/admin"
            element={isAuthenticated && role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Login />
            )}
          />
          {/* ✅ Notifications Page */}
          <Route
            path="/notifications"
            element={isAuthenticated ? <NotificationList /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;

