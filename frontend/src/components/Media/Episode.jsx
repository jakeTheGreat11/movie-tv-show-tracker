import React from "react";
import "./Episode.css";
import CheckBox from "../common/CheckBox";

const Episode = ({ episode }) => {
  return (
    <div className="episode">
      <img
        src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
        alt={episode.name}
        className="episode-thumbnail"
      />
      <div className="episode-info">
        <h4>{`S${episode.season_number} | E${episode.episode_number}`}</h4>
        <p>{episode.name}</p>
      </div>
      <div className="episode-status"></div>
      <CheckBox />
    </div>
  );
};

export default Episode;
