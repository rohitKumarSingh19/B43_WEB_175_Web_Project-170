import { useState } from "react";
import { registerUser } from "../api/authApi";
import { TextField, Button, Container, Typography } from "@mui/material";

function Register() {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      alert("✅ Registration Successful! Please login.");
    } catch (error) {
      alert(`❌ Registration Failed: ${error}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" onChange={handleChange} required />
        <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required />
        <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Container>
  );
}

export default Register;
