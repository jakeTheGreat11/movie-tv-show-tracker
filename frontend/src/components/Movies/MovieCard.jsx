import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <main class="wrapper">
      <article class="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </article>
    </main>
  );
};

export default MovieCard;
