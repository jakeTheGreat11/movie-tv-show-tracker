import React, { useState, useEffect } from "react";
import "./DiscoverPage.css";
import MediaCard from "../components/Media/MediaCard";
import { useDiscoverStore } from "../store/useDiscoverStore";
import MediaFilter from "../components/Filters/MediaFilter";

const DiscoverPage = ({ mediaType }) => {
  const {
    fetchDiscoverMedia,
    fetchGenres,
    fetchLanguages,
    discoverMedia,
    setCurrentPage,
    currentPage,
    selectedLanguage,
    selectedGenres,
    selectedYear,
    minMediaRating,
    selectedSortBy,
    error,
  } = useDiscoverStore();

  useEffect(() => {
    fetchGenres(mediaType);
    fetchLanguages();
    fetchDiscoverMedia(
      currentPage,
      selectedLanguage,
      minMediaRating,
      selectedGenres,
      selectedSortBy,
      selectedYear,
      mediaType
    );
  }, [currentPage, fetchDiscoverMedia, mediaType]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDiscoverMedia(
      1,
      selectedLanguage,
      minMediaRating,
      selectedGenres,
      selectedSortBy,
      selectedYear,
      mediaType
    );
  };
  const loadMoreMedia = () => {
    setCurrentPage(currentPage + 1); // Load more movies or TV shows
  };

  return (
    <div className="discover-page card">
      <MediaFilter mediaType={mediaType} handleSearch={handleSearch} />

      <main className="media-content">
        <div className="media-grid">
          {discoverMedia.map((media, index) => (
            <MediaCard media={media} key={index} />
          ))}
        </div>
        <button onClick={loadMoreMedia}>Load More</button>
      </main>
    </div>
  );
};

export default DiscoverPage;
