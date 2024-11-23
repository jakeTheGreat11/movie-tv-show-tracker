import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Update user avatar
export const updateAvatar = async (userId, selectedAvatar) => {
  try {
    const response = await axios.patch(`${API_URL}/user/avatar`, {
      userId,
      avatar: selectedAvatar,
    });

    console.log(response.data.message); // "Avatar updated successfully."
  } catch (error) {
    console.error("Error updating avatar:", error);
  }
};

// Function to fetch movies by query
export const fetchMovies = async (query, page = 1) => {
  const response = await axios.get(`${API_URL}/search/movies`, {
    params: { query, page },
  });
  return response.data;
};

// Function to fetch TV shows by query
export const fetchTVShows = async (query, page = 1) => {
  const response = await axios.get(`${API_URL}/search/tv-shows`, {
    params: { query, page },
  });
  return response.data;
};
