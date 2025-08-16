import axios from "axios";

export const apiBaseURL = process.env.NEXT_PUBLIC_API_BASE;

export const getAllImages = async () => {
  try {
    const response = await axios.get(`${apiBaseURL}all_images/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};
