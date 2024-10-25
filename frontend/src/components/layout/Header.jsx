import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="website-header">
      <nav>
        <ul>
          <li>
            <strong>
              <a href="/">jake tracker</a>
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
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  );
};

export default Header;
