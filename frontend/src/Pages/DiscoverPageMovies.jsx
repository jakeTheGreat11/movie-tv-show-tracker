import React, { useState, useEffect } from "react";
import LanguagesDropdown from "../components/common/LanguagesDropdown";
import "./DiscoverPageMovies.css";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "../components/Movies/MovieCard";

const DiscoverPageMovies = (path) => {
  const { fetchDiscoverMovies, discoverMovies, isLoading, error } =
    useMovieStore();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDiscoverMovies(currentPage, selectedLanguage);
  }, [selectedLanguage, currentPage, fetchDiscoverMovies]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleSearch = () => {
    fetchDiscoverMovies(currentPage, selectedLanguage);
  };
  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Load more movies
  };

  return (
    <div className="discover-page">
      <aside className="filters-sidebar">
        <form onSubmit={handleSearch}>
          <h2>Filter Movies</h2>
          <LanguagesDropdown onLanguageChange={handleLanguageChange} />
          <button type="submit">Search</button>
        </form>
      </aside>

      <main className="movies-content">
        <div className="movies-grid">
          {discoverMovies.map((movie, index) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        <button onClick={loadMoreMovies}>Load More</button>
      </main>
    </div>
  );
};

export default DiscoverPageMovies;
