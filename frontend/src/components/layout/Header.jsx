import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Avatar from "../common/Avatar";
import logo from "../../assets/images/logo.png";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { user } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState(null); // Local state for the avatar URL
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="website-header">
      <nav>
        <ul>
          <li>
            <strong>
              <a href="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "250px", height: "auto" }}
                />
              </a>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <form role="search" onSubmit={handleSearchSubmit}>
              <input
                name="search"
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input type="submit" value="Search" className="search-input" />
            </form>
          </li>
          <li>
            <a href="/movies/discover">Movies</a>
          </li>
          <li>
            <a href="/tv-shows/discover">TV Shows</a>
          </li>
          <li>
            <a href="/user/watchlist">Watchlist</a>
          </li>
          <li>
            <Avatar imageUrl={avatarUrl || "/avatars/default-avatar.jpg"} />
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
};

export default Header;
