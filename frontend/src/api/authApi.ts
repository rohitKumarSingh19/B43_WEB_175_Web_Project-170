import axios from "axios";
const API_URL = "http://localhost:5000/api/auth";
// Error Handling Function
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return "An unexpected error occurred";
};
// User Registration
export const registerUser = async (userData: { name: string; email: string; password: string,role:string}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
// User Login
export const loginUser = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    // Ensure response contains token
    if (response.data && response.data.token && response.data.user.role) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      return response.data;
    } else {
      throw new Error("Invalid server response: No token received");
    }
  } catch (error) {
    throw handleAxiosError(error);
  }
};
