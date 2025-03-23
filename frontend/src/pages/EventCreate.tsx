
// import { useState, useEffect } from "react";
// import { createEvent } from "../api/eventApi";
// import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// function EventCreate() {
//   const [eventData, setEventData] = useState({ title: "", description: "", date: "", location: "",category:"",eventType:"Public" });
//   const [role, setRole] = useState<string | null>(null); // Store user role
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Get role from localStorage
//     const storedRole = localStorage.getItem("role");
//     setRole(storedRole);
//     if (!storedRole) {
//       alert("❌ Access Denied! No role found.");
//       navigate("/");
//       return;
//     }
    

//     // Redirect if user is not an "organizer" or "admin"
//     if (storedRole !== "organizer" && storedRole !== "admin") {
//       alert("❌ Access Denied! Only organizers and admins can create events.");
//       navigate("/");
//     }
//   }, [navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     //check if all fields
//     console.log("📤 Sending Event Data:", eventData); // Debugging Log
//     try {
//       const token=localStorage.getItem("token");
//       if(!token){
//         alert("❌ Unauthorized! Please log in.");
//         navigate("/login");
//         return;
//       }
//        await createEvent(eventData);
//       alert("✅ Event Created Successfully!");
//       //Notify AdminDashboard to refresh data
//       window.dispatchEvent(new Event("storage"));
//       navigate("/admin");
//       // localStorage.setItem("eventCreated","true");
//       // navigate("/admin"); // Redirect to Home page after event creation
//     } catch (error) {
//       alert(`❌ Failed to create event: ${error}`);
      
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
//         <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
//           <CardContent>
//             <Typography variant="h5" textAlign="center" gutterBottom>
//               Create Event
//             </Typography>
//             {role === "organizer" || role === "admin" ? (
//               <form onSubmit={handleSubmit}>
//                 <TextField fullWidth label="Title" name="title" onChange={handleChange} required margin="normal" />
//                 <TextField fullWidth label="Description" name="description" onChange={handleChange} required margin="normal" />
//                 <TextField fullWidth type="date" name="date" onChange={handleChange} required margin="normal" />
//                 <TextField fullWidth label="Location" name="location" onChange={handleChange} required margin="normal" />

              

//                 <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
//                   Create Event
//                 </Button>
//               </form>
//             ) : (
//               <Typography variant="h6" color="error" textAlign="center">
//                 ❌ Access Denied! Only organizers and admins can create events.
//               </Typography>
//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </Container>
//   );
// }

// export default EventCreate;


import { useState, useEffect } from "react";
import { createEvent } from "../api/eventApi";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function EventCreate() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "", // ✅ Fixed category default
    eventType: "Public", // ✅ Fixed default value
  });

  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (!storedRole) {
      alert("❌ Access Denied! No role found.");
      navigate("/");
      return;
    }

    if (storedRole !== "organizer" && storedRole !== "admin") {
      alert("❌ Access Denied! Only organizers and admins can create events.");
      navigate("/");
    }
  }, [navigate]);

  // ✅ FIXED `onChange` for MUI `<Select>` dropdowns
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value as string, // Ensure the value is correctly stored as a string
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //console.log("📤 Sending Event Data:", eventData); // Debugging Log

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Unauthorized! Please log in.");
        navigate("/login");
        return;
      }

      await createEvent(eventData);
      alert("✅ Event Created Successfully!");

      // Notify AdminDashboard to refresh data
      window.dispatchEvent(new Event("storage"));
      navigate("/admin");
    } catch (error) {
      alert(`❌ Failed to create event: ${error}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Create Event
            </Typography>
            {role === "organizer" || role === "admin" ? (
              <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Title" name="title" onChange={handleChange} required margin="normal" />
                <TextField fullWidth label="Description" name="description" onChange={handleChange} required margin="normal" />
                <TextField fullWidth type="date" name="date" onChange={handleChange} required margin="normal" />
                <TextField fullWidth label="Location" name="location" onChange={handleChange} required margin="normal" />

                {/* ✅ Fixed Category Dropdown */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={eventData.category}
                    onChange={(e) => handleChange({ target: { name: "category", value: e.target.value } })}
                    required
                  >
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Tech">Tech</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                  </Select>
                </FormControl>

                {/* ✅ Fixed Event Type Dropdown */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="eventType"
                    value={eventData.eventType}
                    onChange={(e) => handleChange({ target: { name: "eventType", value: e.target.value } })}
                    required
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Private">Private</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                  Create Event
                </Button>
              </form>
            ) : (
              <Typography variant="h6" color="error" textAlign="center">
                ❌ Access Denied! Only organizers and admins can create events.
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default EventCreate;
