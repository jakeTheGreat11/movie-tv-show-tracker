import React, { useState, useEffect } from "react";
import LanguagesDropdown from "../components/common/LanguagesDropdown";
import "./DiscoverPageMovies.css";
import MovieCard from "../components/Movies/MovieCard";
import RangeSlider from "../components/common/MovieScoreSlider";
import { useDiscoverStore } from "../store/useDiscoverStore";
import GenreDropdown from "../components/common/GenreDropdown";
import SortByDropdown from "../components/common/SortByDropdown";
import YearSelector from "../components/common/YearSelector";

const DiscoverPageMovies = (path) => {
  const {
    fetchDiscoverMovies,
    fetchMovieGenres,
    fetchLanguages,
    discoverMovies,
    setCurrentPage,
    currentPage,
    selectedLanguage,
    selectedGenres,
    selectedYear,
    minMovieRating,
    selectedSortBy,
    error,
  } = useDiscoverStore();

  useEffect(() => {
    fetchMovieGenres();
    fetchLanguages();
    fetchDiscoverMovies(
      currentPage,
      selectedLanguage,
      minMovieRating,
      selectedGenres,
      selectedSortBy,
      selectedYear
    );
  }, [currentPage, fetchDiscoverMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchDiscoverMovies(
      1,
      selectedLanguage,
      minMovieRating,
      selectedGenres,
      selectedSortBy,
      selectedYear
    );
  };
  const loadMoreMovies = () => {
    setCurrentPage(currentPage + 1); // Load more movies
  };

  return (
    <div className="discover-page card">
      <aside
        className="filters-sidebar"
        style={{
          boxShadow: "0px 0px 54px 11px rgba(0,0,0,0.28)",
        }}
      >
        <form onSubmit={handleSearch}>
          <h2>Filter Movies</h2>
          <LanguagesDropdown />
          <hr />
          <RangeSlider />
          <hr />
          <GenreDropdown />
          <hr />
          <SortByDropdown />
          <hr />
          <YearSelector />

          <button
            type="submit"
            style={{
              backgroundColor: "var(--primary-green)",
              borderColor: "var(--primary-green)",
            }}
          >
            Search
          </button>
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
