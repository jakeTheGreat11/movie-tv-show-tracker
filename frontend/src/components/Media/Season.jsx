import React, { useState } from "react";
import Episode from "./Episode";
import "./Season.css";
import CheckBox from "../common/CheckBox";

const Season = ({ season }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <article className="season">
      <div className="season-header">
        <div style={{ display: "flex", gap: "5px" }}>
          <h3>{season.name}</h3>
          <span onClick={toggleExpand}>{isExpanded ? "▲" : "▼"}</span>
        </div>
        <CheckBox />
      </div>
      {isExpanded && (
        <div className="episode-list" style={{ transition: "ease-in-out" }}>
          {season.episodes.map((episode, index) => (
            <Episode key={index} episode={episode} />
          ))}
        </div>
      )}
    </article>
  );
};

export default Season;
