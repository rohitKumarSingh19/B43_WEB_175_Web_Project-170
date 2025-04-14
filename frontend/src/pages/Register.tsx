// import { useState } from "react";
// import { registerUser } from "../api/authApi";
// import { TextField, Button, Container, Typography } from "@mui/material";

// function Register() {
//   const [userData, setUserData] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await registerUser(userData);
//       alert("✅ Registration Successful! Please login.");
//     } catch (error) {
//       alert(`❌ Registration Failed: ${error}`);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Register</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField fullWidth label="Name" name="name" onChange={handleChange} required />
//         <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required />
//         <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required />
//         <Button type="submit" variant="contained">Register</Button>
//       </form>
//     </Container>
//   );
// }

// export default Register;

import { useState } from "react";
import { registerUser } from "../api/authApi";
import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Register() {
  const [userData, setUserData] = useState({ name: "", email: "", password: "",role:"" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      alert("✅ Registration Successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(`❌ Registration Failed: ${error}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Card sx={{ width: "100%", padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Create an Account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" onChange={handleChange} required margin="normal" />
              <TextField fullWidth label="Email" name="email" type="email" onChange={handleChange} required margin="normal" />
              <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required margin="normal" />
              <TextField fullWidth label="Role" name="role" onChange={handleChange} required margin="normal" />

              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Register;

