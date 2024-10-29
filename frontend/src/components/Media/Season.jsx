import React, { useState } from "react";
import Episode from "./Episode";

const Season = ({ season }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="season">
      <div className="season-header" onClick={toggleExpand}>
        <h3>Season {season.season_number}</h3>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>
      {isExpanded && (
        <div className="episode-list">
          {season.episodes.map((episode, index) => (
            <Episode key={index} episode={episode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Season;
