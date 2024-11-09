import React from "react";
import Episode from "./Episode";

const EpisodeList = ({ mediaId, episodes }) => (
  <div className="episode-list" style={{ transition: "ease-in-out" }}>
    {episodes.map((episode, index) => (
      <Episode mediaId={mediaId} key={index} episode={episode} />
    ))}
  </div>
);

export default EpisodeList;
