import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieList from "../components/Movies/MovieList";
import "./HomePage.css";

const MovieLists = () => {
  const {
    popularMovies,
    nowPlayingMovies,
    upcomingMovies,
    topRatedMovies,
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    isLoading,
    error,
  } = useMovieStore();

  useEffect(() => {
    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
  }, [
    fetchPopularMovies,
    fetchNowPlayingMovies,
    fetchTopRatedMovies,
    fetchUpcomingMovies,
  ]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-lists">
      <MovieList title="Popular Movies" movies={popularMovies} />

      <MovieList title="New Released Movies" movies={nowPlayingMovies} />

      <MovieList title="Top Rated Movies" movies={topRatedMovies} />

      <MovieList title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
};

export default MovieLists;
