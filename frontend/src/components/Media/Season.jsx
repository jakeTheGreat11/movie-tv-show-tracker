import React, { useState } from "react";
import "./Season.css";
import CheckBox from "../common/CheckBox";
import EpisodeList from "./EpisodeList";
import { useMediaPageStore } from "../../store/mediaPageStore";
import { useAuthStore } from "../../store/authStore";

const Season = ({ mediaId, season }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addSeasonToWatchlist, watchedSeasons } = useMediaPageStore();
  const { user } = useAuthStore();
  const userId = user?.id;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const isChecked = watchedSeasons?.some(
    (watched) => watched.season_id === season.id
  );

  const handleSeasonWatchToggle = (watched) => {
    console.log("pressed on season.");
    console.log("watched: ", watched);
    console.log("userId: ", userId);
    console.log("mediaId: ", mediaId);
    console.log("season.id: ", season.id);
    addSeasonToWatchlist(userId, mediaId, season.id, watched);
  };

  return (
    <article className="season">
      <div className="season-header">
        <div style={{ display: "flex", gap: "5px" }}>
          <h3>{season.name}</h3>
          <span onClick={toggleExpand}>{isExpanded ? "▲" : "▼"}</span>
        </div>
        <CheckBox isChecked={isChecked} onChange={handleSeasonWatchToggle} />
      </div>
      {isExpanded && (
        <EpisodeList mediaId={mediaId} episodes={season.episodes} />
      )}
    </article>
  );
};

export default Season;
