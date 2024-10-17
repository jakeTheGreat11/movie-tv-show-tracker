import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <strong>jake tracker</strong>
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
            <a href="/movies">Movies</a>
          </li>
          <li>
            <a href="/tv-shows">TV Shows</a>
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
