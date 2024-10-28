import React from "react";
import "./MediaCard.css";
import { Link } from "react-router-dom";

const MediaCard = ({ media }) => {
  // console.log(media.vote_average);

  const mediaType = media.name ? "tv-shows" : "movies"; //this effects the url in media page
  const title = mediaType === "tv-shows" ? media.name : media.title;
  return (
    <main className="wrapper">
      <Link to={`/${mediaType}/${media.id}`}>
        <article className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
          />
          <h3 className="movie-title">{title} </h3>
        </article>
      </Link>
    </main>
  );
};

export default MediaCard;
