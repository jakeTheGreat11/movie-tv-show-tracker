import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import ContentList from "../components/Movies/ContentList";
import "./HomePage.css";
import { useTvShowStore } from "../store/tvShowStore";

const HomePage = () => {
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

  const {
    airingTodayTvShows,
    onTheAirTvShows,
    popularTvShows,
    topRatedTvShows,
    fecthAiringTodayTvShows,
    fetchOnTheAirTvShows,
    fetchPopularTvShows,
    fetchTopRatedTvShows,
  } = useTvShowStore();

  useEffect(() => {
    fetchPopularMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
    fecthAiringTodayTvShows();
    fetchOnTheAirTvShows();
    fetchPopularTvShows();
    fetchTopRatedTvShows();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="movie-lists">
      <ContentList title="Popular Movies" content={popularMovies} />

      <ContentList title="New Released Movies" content={nowPlayingMovies} />

      <ContentList title="Top Rated Movies" content={topRatedMovies} />

      <ContentList title="Upcoming Movies" content={upcomingMovies} />

      <ContentList title="Airing Today Shows" content={airingTodayTvShows} />

      <ContentList title="On The Air Shows" content={onTheAirTvShows} />

      <ContentList title="Popular Shows" content={popularTvShows} />

      <ContentList title="Top Rated Shows" content={topRatedTvShows} />
    </div>
  );
};

export default HomePage;
