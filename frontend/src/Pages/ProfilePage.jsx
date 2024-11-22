import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { avatars } from "../utils/avatars";
import updateAvatar from "../utils/api";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [isEditingAvatar, setIsEditingAvatar] = useState(false); // To toggle avatar selection mode

  const handleAvatarSelect = async (selectedAvatar) => {
    setAvatar(selectedAvatar); // Update avatar
    setIsEditingAvatar(false); // Close avatar selection after choosing

    await updateAvatar(user.id, selectedAvatar);
  };

  const handleResendVerification = () => {
    // Logic to resend verification email
    alert("Verification email resent!");
  };

  if (!user) {
    return (
      <div className="loading-profile">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
            clipRule="evenodd"
          />
        </svg>
        <h1>Edit Profile</h1>
      </div>

      <article className="profile-content">
        <label>Email Address</label>
        <input
          type="email"
          value={user.email || ""}
          readOnly
          className="input-field"
        />

        <label>Your Username</label>
        <input
          type="username"
          value={user.username || ""}
          readOnly
          className="input-field"
        />

        <div className="change-password">
          <span role="img" aria-label="lock">
            🔒
          </span>
          Change password
        </div>

        <div className="profile-avatar">
          <img
            src={user.avatar || "default-avatar.png"} // Display the selected avatar or default
            alt="User Avatar"
            className="avatar-img"
          />
          <div
            className="edit-avatar"
            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
          >
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </div>
        </div>

        {isEditingAvatar && (
          <div className="avatar-selection">
            {avatars.map((avatarOption, index) => (
              <img
                key={index}
                src={avatarOption}
                alt={`Avatar ${index + 1}`}
                className={`avatar-option ${
                  user.avatar === avatarOption ? "selected" : "" // just avatar
                }`}
                onClick={() => handleAvatarSelect(avatarOption)} // Select avatar
              />
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default ProfilePage;
