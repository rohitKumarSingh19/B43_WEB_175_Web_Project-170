import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";

function EventCreate() {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/events/create", eventData);
      alert("✅ Event Created Successfully!");
      setEventData({ title: "", description: "", date: "", location: "" }); // Reset form
    } catch (error) {
      console.error("❌ Error creating event:", error);
      alert("❌ Failed to create event. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={eventData.title} // Controlled input
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          margin="normal"
          InputLabelProps={{ shrink: true }} // Ensures label doesn't overlap
        />
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Create Event</Button>
      </form>
    </Container>
  );
}

export default EventCreate;
