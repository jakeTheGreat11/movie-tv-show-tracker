import React, { useState } from "react";
import "./MediaList.css";
import MediaCard from "./MediaCard";

const MediaList = ({ content, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of items to show at a time
  const visibleItems = 4;

  // Handle Next Button Click
  const handleNext = () => {
    if (currentIndex + visibleItems < content.length) {
      setCurrentIndex(currentIndex + visibleItems);
    } else {
      setCurrentIndex(content.length - visibleItems);
    }
  };

  // Handle Previous Button Click
  const handlePrev = () => {
    if (currentIndex - visibleItems >= 0) {
      setCurrentIndex(currentIndex - visibleItems);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <article className="content-list-container">
      <hgroup>
        <h2 className="content-list-title">{title}</h2>

        <button
          className="prev-button list-button"
          disabled={currentIndex === 0}
          onClick={handlePrev}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>

        <div className="content-list">
          {content
            .slice(currentIndex, currentIndex + visibleItems)
            .map((item) => (
              <div className="content-item" key={item.id}>
                <MediaCard media={item} />
              </div>
            ))}
        </div>

        <button
          className="next-button list-button"
          disabled={currentIndex + visibleItems >= content.length}
          onClick={handleNext}
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </hgroup>
    </article>
  );
};

export default MediaList;
