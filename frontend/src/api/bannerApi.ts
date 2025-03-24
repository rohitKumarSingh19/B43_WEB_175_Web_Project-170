import axios from "axios"; // ❌ Removed { AxiosError }

const API_URL = "https://event-management-xc6u.onrender.com/api/banner";

// ✅ Helper Function for Handling Errors
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An error occurred while processing your request.";
  }
  return "An unexpected error occurred.";
};

// ✅ Fetch Banner Data
export const getBanner = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// ✅ Update Banner (Admin Only)
export const updateBanner = async (bannerData: { title: string; description: string; image: string }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(API_URL, bannerData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};
