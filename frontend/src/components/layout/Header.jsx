import React, { useEffect, useState } from "react";
import "./Header.css";
import Avatar from "../common/Avatar";
import logo from "../../assets/images/logo.png";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { user } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = useState(null); // Local state for the avatar URL
  console.log(user);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarUrl(user.avatar);
      console.log("in if");
    }
  }, [user]);

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
            <form role="search">
              <input name="search" type="search" placeholder="Search" />
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
