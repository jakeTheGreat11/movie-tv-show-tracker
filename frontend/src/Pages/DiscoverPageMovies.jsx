import React, { useState, useEffect } from "react";
import LanguagesDropdown from "../components/common/LanguagesDropdown";
import "./DiscoverPageMovies.css";
import { useMovieStore } from "../store/movieStore";
import MovieCard from "../components/Movies/MovieCard";

const DiscoverPageMovies = (path) => {
  const {
    fetchLanguages,
    fetchDiscoverMovies,
    languages,
    discoverMovies,
    isLoading,
    error,
  } = useMovieStore();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLanguages(); // Fetch language list on component mount
  }, [fetchLanguages]);
  useEffect(() => {
    fetchDiscoverMovies(currentPage, selectedLanguage);
  }, [path, selectedLanguage, currentPage, fetchDiscoverMovies]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // Update selected language
  };

  const handleSearch = () => {
    fetchDiscoverMovies();
  };
  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Load more movies
  };

  return (
    <div className="discover-page">
      <aside className="filters-sidebar">
        <h2>Filter Movies</h2>
        {/* <LanguagesDropdown
          languages={languages}
          onLanguageChange={handleLanguageChange}
        /> */}
        <button onClick={handleSearch}>Search</button>
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
