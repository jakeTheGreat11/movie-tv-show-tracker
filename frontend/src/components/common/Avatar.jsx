import React from "react";
import { useNavigate } from "react-router-dom";

const Avatar = ({ imageUrl }) => {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <img
      src={imageUrl || "default-avatar.png"} // Use a default avatar if none is provided
      alt="User Avatar"
      style={{
        cursor: "pointer",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      }}
      onClick={handleAvatarClick}
    />
  );
};

export default Avatar;
