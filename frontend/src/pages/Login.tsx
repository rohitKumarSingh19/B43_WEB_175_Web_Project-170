import { useState } from "react";
import { loginUser } from "../api/authApi";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(userData);
      if (data.token) {
        alert(`✅ Login Successful! Welcome, ${data.user.name}`);
        navigate("/"); // Redirect to home
      } else {
        throw new Error("Token missing in response");
      }
    } catch (error) {
      alert(`❌ Login Failed: ${error}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" onChange={handleChange} required />
        <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Container>
  );
}

export default Login;
