import React from "react";
import "./MediaCard.css";
import { Link } from "react-router-dom";

const MediaCard = ({ media, media_type }) => {
  // console.log(media.vote_average);

  let mediaType = "";

  //differnt naming convention in the db so i just added this
  if (!media_type) {
    mediaType = media.name ? "tv-shows" : "movies"; //this effects the url in media page
  } else {
    mediaType = media_type;
  }
  const title = media.name || media.title;

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
