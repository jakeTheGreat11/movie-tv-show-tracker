import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MediaPage.css";

const MediaPage = () => {
  //later on i will do more stylign and add components like genre components and more
  const { id, mediaType } = useParams(); // Get media ID from the URL
  const [mediaDetails, setMediaDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch media details based on ID
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/${mediaType}/${id}`
        );
        const media = response.data.media;
        console.log(media);
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
  const {
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    genres,
    backdrop_path,
  } = mediaDetails;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div class="media-page">
      <div
        className="media-poster"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          borderRadius: "20px",
        }}
      ></div>{" "}
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
    </div>
  );
};

export default MediaPage;
