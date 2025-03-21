
import { useState } from "react";
import { loginUser } from "../api/authApi";
import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser(userData);
      
      // Store token and role in localStorage
      if (data.token && data.user.role) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); // Store role
      }

      alert(`✅ Login Successful! Welcome, ${data.user.name}`);
      //redirect user based on role
      if(data.user.role==='organizer' || data.user.role==='admin'){
        navigate("/create")//Redirect organizers/admins to create Event Page
      }
      else{
        // Redirect to home or previous location
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
      }
      
    } catch (error) {
      alert(`❌ Login Failed: ${error}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Login to Your Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required margin="normal" />
              <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required margin="normal" />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
