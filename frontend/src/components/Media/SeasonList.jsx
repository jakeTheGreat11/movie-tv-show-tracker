import React from "react";
import Season from "./Season";

const SeasonList = ({ mediaId, seasons }) => (
  <div className="season-list">
    {seasons.map((season, index) => (
      <Season mediaId={mediaId} key={index} season={season} />
    ))}
  </div>
);

export default SeasonList;
