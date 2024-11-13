import React from "react";
import { useAuthStore } from "../store/authStore"; // Adjust path as needed
import "./ProfilePage.css"; // Add custom CSS here for styling

const ProfilePage = () => {
  const { user } = useAuthStore();

  console.log("in profile page.");
  const handleResendVerification = () => {
    // Logic to resend verification email
    alert("Verification email resent!");
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-header">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
              clip-rule="evenodd"
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
              src={user.avatar || "default-avatar.png"} // Default avatar if none
              alt="User Avatar"
              className="avatar-img"
            />
            <div className="edit-avatar">
              <span role="img" aria-label="edit">
                ✏️
              </span>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default ProfilePage;
