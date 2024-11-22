import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Update user avatar
const updateAvatar = async (userId, selectedAvatar) => {
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

export default updateAvatar;
