import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovies, fetchTVShows } from "../utils/api";
import MediaCard from "../components/Media/MediaCard";
import "./SearchResultsPage.css";

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Extract 'query' from the URL

  const [movies, setMovies] = useState([]);
  const [moviesTotalResults, setMoviesTotalResults] = useState(1);
  const [tvShows, setTvShows] = useState([]);
  const [tvShowTotalResults, setTvShowTotalResults] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("movies");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        // Fetch both movies and TV shows in parallel
        const [moviesRes, tvShowsRes] = await Promise.all([
          fetchMovies(query, currentPage),
          fetchTVShows(query, currentPage),
        ]);

        // Update state with results
        setMovies(moviesRes.results);
        setTvShows(tvShowsRes.results);

        //Update state with total results
        setMoviesTotalResults(moviesRes.total_results);
        setTvShowTotalResults(tvShowsRes.total_results);

        // Update totalPages dynamically based on the active category
        setTotalPages(
          activeCategory === "movies"
            ? moviesRes.total_pages
            : tvShowsRes.total_pages
        );
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, currentPage, activeCategory]);

  // Reset currentPage to 1 when switching categories
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPagination = () => (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );

  const renderResults = () => {
    const results = activeCategory === "movies" ? movies : tvShows;

    return results?.length > 0 ? (
      <ul className="results-list">
        {results.map((result) => (
          <MediaCard media={result} key={result.id} />
        ))}
      </ul>
    ) : (
      <p>No results found for {activeCategory}.</p>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="search-results-page">
      <div className="sidebar">
        <h2>Search Results</h2>
        <ul>
          <li
            className={activeCategory === "movies" ? "active" : ""}
            onClick={() => setActiveCategory("movies")}
          >
            Movies ({moviesTotalResults})
          </li>
          <li
            className={activeCategory === "tv-shows" ? "active" : ""}
            onClick={() => setActiveCategory("tv-shows")}
          >
            TV Shows ({tvShowTotalResults})
          </li>
        </ul>
      </div>
      <div className="results-content">
        <h1>Results for "{query}"</h1>
        {renderResults()}
        {renderPagination()}
      </div>
    </div>
  );
};

export default SearchResultsPage;
