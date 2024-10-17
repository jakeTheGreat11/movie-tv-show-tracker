import React, { useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Number of movies to show at a time
  const visibleMovies = 4;

  // Handle Next Button Click
  const handleNext = () => {
    if (currentIndex + visibleMovies < movies.length) {
      setCurrentIndex(currentIndex + visibleMovies);
    } else {
      // If remaining movies are less than visibleMovies, show the last set of movies
      setCurrentIndex(movies.length - visibleMovies);
    }
  };

  // Handle Previous Button Click
  const handlePrev = () => {
    if (currentIndex - visibleMovies >= 0) {
      setCurrentIndex(currentIndex - visibleMovies);
    } else {
      setCurrentIndex(0); // Go to the first set of movies
    }
  };

  return (
    <article className="movie-list-container">
      <hgroup>
        <h2 className="movie-list-title">{title}</h2>

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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m15 19-7-7 7-7"
            />
          </svg>
        </button>

        <div className="movie-list">
          {movies
            .slice(currentIndex, currentIndex + visibleMovies)
            .map((movie) => (
              <div className="movie-item" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>

        <button
          className="next-button list-button"
          disabled={currentIndex + visibleMovies >= movies.length}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </button>
      </hgroup>
    </article>
  );
};

export default MovieList;
