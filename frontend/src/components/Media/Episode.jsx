import React from "react";
import "./Episode.css";
import CheckBox from "../common/CheckBox";
import { useMediaPageStore } from "../../store/mediaPageStore";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

const Episode = ({ mediaId, episode }) => {
  const { watchedEpisodes, addEpisodeToWatchlist } = useMediaPageStore();

  const { user } = useAuthStore();
  const userId = user?.id;

  const isChecked = watchedEpisodes?.some(
    (watched) => watched.episode_id === episode.id
  );

  const handleEpisodeWatchToggle = (watched) => {
    console.log("pressed on episode.");
    console.log("watched: ", watched);
    console.log("userId: ", userId);
    console.log("mediaId: ", mediaId);
    console.log("episode.id: ", episode.id);
    addEpisodeToWatchlist(userId, mediaId, episode.id, !watched);
  };

  useEffect(() => {}, [watchedEpisodes]);

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
      <CheckBox isChecked={isChecked} onChange={handleEpisodeWatchToggle} />
    </div>
  );
};

export default Episode;
