
import { useState, useEffect } from "react";
import { createEvent } from "../api/eventApi";
import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EventCreate() {
  const [eventData, setEventData] = useState({ title: "", description: "", date: "", location: "" });
  const [role, setRole] = useState<string | null>(null); // Store user role
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from localStorage
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      alert("❌ Access Denied! No role found.");
      navigate("/");
    }
    setRole(storedRole);

    // Redirect if user is not an "organizer" or "admin"
    if (storedRole !== "organizer" && storedRole !== "admin") {
      alert("❌ Access Denied! Only organizers and admins can create events.");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(eventData);
      alert("✅ Event Created Successfully!");
      //Notify AdminDashboard to refresh data
      localStorage.setItem("eventCreated","true");
      navigate("/admin"); // Redirect to Home page after event creation
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
