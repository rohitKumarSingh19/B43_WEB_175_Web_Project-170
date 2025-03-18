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
      alert("Event Created!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" name="title" onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Description" name="description" onChange={handleChange} required margin="normal" />
        <TextField fullWidth type="date" name="date" onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Location" name="location" onChange={handleChange} required margin="normal" />
        <Button type="submit" variant="contained" color="primary">Create Event</Button>
      </form>
    </Container>
  );
}
export default EventCreate;
