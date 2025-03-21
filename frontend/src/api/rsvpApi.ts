import axios from "axios"; // ✅ Removed AxiosError import

const API_URL = "http://localhost:5000/api/rsvp";

// ✅ Helper function to handle Axios errors properly
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unexpected error occurred";
  }
  return "Something went wrong. Please try again.";
};

// ✅ Send RSVP Response
export const submitRSVP = async (eventId: string, status: "going" | "not going" | "maybe") => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_URL}/${eventId}/rsvp`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw handleAxiosError(error);
  }
};

// ✅ Fetch RSVP Stats
export const getEventRSVPs = async (eventId: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_URL}/${eventId}/rsvps`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: unknown) {
    throw handleAxiosError(error);
  }
};
