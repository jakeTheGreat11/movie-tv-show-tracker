import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import MovieList from "../components/Movies/MovieList";

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
    <div>
      {/* Render the Popular Movies List */}
      <MovieList title="Popular Movies" movies={popularMovies} />

      {/* Render the New Movies List */}
      <MovieList title="New Releases" movies={nowPlayingMovies} />

      <MovieList title="Top Rated" movies={topRatedMovies} />

      <MovieList title="New Releases" movies={upcomingMovies} />
    </div>
  );
};

export default MovieLists;
