import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MediaPage.css";
import Season from "../components/Media/Season";
import WatchStatusDropdown from "../components/common/StatusButtonGroup";
import { useMediaPageStore } from "../store/mediaPageStore";
import { useAuthStore } from "../store/authStore";
import StatusButtonGroup from "../components/common/StatusButtonGroup";

const MediaPage = () => {
  //later on i will do more styling and add components for ecery media detail like genre components and more
  const { id, mediaType } = useParams();
  const mediaId = id;
  const { mediaDetails, fetchDetails, watchlistStatus } = useMediaPageStore();
  const { user } = useAuthStore();
  const userId = user ? user.id : null;

  useEffect(() => {
    // Fetch media details based on ID
    fetchDetails(mediaId, mediaType);
  }, [mediaId, mediaType, userId]);

  // make loading div when waiting for media
  if (!mediaDetails) {
    return (
      <article
        aria-busy="true"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      ></article>
    );
  }
  // destructure media for easier use
  const { title, overview, vote_average, release_date, genres, backdrop_path } =
    mediaDetails;
  console.log("🚀 ~ MediaPage ~ mediaDetails:", mediaDetails);
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div class="media-page">
      <div
        className="media-poster"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      <div class="media-info">
        <h2>{title}</h2>
        <p>{overview}</p>

        <div class="media-details">
          <span>Average Vote: {vote_average}</span>
          <span>Release Date: {release_date}</span>
          {/*fix realse date so that it shows also for tv (airing i think) */}
          <span>Genres: {genres.map((genre) => genre.name).join(", ")}</span>
        </div>
      </div>

      <div className="status-buttons">
        <StatusButtonGroup
          mediaId={mediaId}
          mediaType={mediaType}
          userId={userId}
        />
      </div>

      {/* display when tv show is in watchlist */}
      {watchlistStatus !== "" &&
        mediaDetails.seasons &&
        mediaDetails.seasons.length > 0 && (
          <div className="media-page">
            {mediaDetails.seasons.map((season, index) => (
              <Season key={index} season={season} />
            ))}
          </div>
        )}
    </div>
  );
};

export default MediaPage;
