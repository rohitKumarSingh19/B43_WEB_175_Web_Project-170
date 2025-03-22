import axios from "axios"; // Removed { AxiosError }

const API_URL = "http://localhost:5000/api/events";

// Helper function to get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Error Handling Function
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unexpected error occurred";
  }
  return "Something went wrong. Please try again.";
};

// CREATE EVENT (Protected Route)
export const createEvent = async (eventData: object) => {
  try {
    const response = await axios.post(`${API_URL}/create`, eventData, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw handleAxiosError(error);
  }
};

// GET ALL EVENTS (Public Route)
export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: unknown) {
    throw handleAxiosError(error);
  }
};
//Fetch Upcoming events with filters
export const getUpcomingEvents = async (filters: { category?: string; eventType?: string }) => {
  const response = await axios.get(`${API_URL}/upcoming`, { params: filters });
  return response.data;
};

//Fetch past events with Filters
export const getPastEvents = async (filters: { category?: string; eventType?: string }) => {
  const response = await axios.get(`${API_URL}/past`, { params: filters });
  return response.data;
};
