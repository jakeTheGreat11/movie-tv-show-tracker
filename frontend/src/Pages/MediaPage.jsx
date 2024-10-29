import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MediaPage.css";
import Season from "../components/Media/Season";

const MediaPage = () => {
  //later on i will do more stylign and add components like genre components and more
  const { id, mediaType } = useParams();
  const [mediaDetails, setMediaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [showAccordion, setShowAccordion] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus); // Update the status
    setShowAccordion(true); // Show the accordion when status is set
  };

  useEffect(() => {
    // Fetch media details based on ID
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/${mediaType}/${id}`
        );
        const media = response.data.media;
        console.log("mediaDetails.seasons: ", media.seasons);
        setMediaDetails(media);
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const { title, overview, vote_average, release_date, genres, backdrop_path } =
    mediaDetails;
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div class="media-page" aria-busy={loading ? true : false}>
      <div
        className="media-poster"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      <div class="media-info">
        <h2>{title}</h2>
        <p>{overview}</p>
        <div class="media-details">
          <span>Average Vote: {vote_average}</span>
          <span>Release Date: {release_date}</span>{" "}
          {/*fix realse date so that it shows also for tv (airing i think) */}
          <span>Genres: {genres.map((genre) => genre.name).join(", ")}</span>
        </div>
      </div>
      <div className="status-buttons">
        <button onClick={() => handleStatusClick("watched")}>
          Add To Watched
        </button>
        {mediaType === "tv-shows" ? (
          <button onClick={() => handleStatusClick("watching")}>
            Add To Watching
          </button>
        ) : null}
        <button onClick={() => handleStatusClick("plan-to-watch")}>
          Add To Plan to Watch
        </button>
      </div>
      {showAccordion && (
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
