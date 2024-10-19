import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="website-footer">
      <hr />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>© 2024 Your Movie App. All rights reserved.</p>
            <a href="/terms">Terms of Service</a> |{" "}
            <a href="/privacy">Privacy Policy</a>
          </div>

          <div className="footer-right">
            <p>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-e81a5e3b12b0902c7f6ee63670fbdbb53c0c688938ebae65e98b91b6b4f4875d.svg"
                alt="TMDb Logo"
                className="tmdb-logo"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
