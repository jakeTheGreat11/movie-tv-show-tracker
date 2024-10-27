import React, { useEffect } from "react";
import { useMovieStore } from "../store/movieStore";
import { useTvShowStore } from "../store/tvShowStore";
import ContentList from "../components/Movies/ContentList";
import "./HomePage.css";

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
    isLoadingPopularMovies,
    isLoadingNowPlayingMovies,
    isLoadingUpcomingMovies,
    isLoadingTopRatedMovies,
    errorPopularMovies,
    errorNowPlayingMovies,
    errorUpcomingMovies,
    errorTopRatedMovies,
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
    isLoadingAiringTodayTvShows,
    isLoadingOnTheAirTvShows,
    isLoadingPopularTvShows,
    isLoadingTopRatedTvShows,
    errorAiringTodayTvShows,
    errorOnTheAirTvShows,
    errorPopularTvShows,
    errorTopRatedTvShows,
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

  const contentLists = [
    {
      title: "Popular Movies",
      content: popularMovies,
      isLoading: isLoadingPopularMovies,
      error: errorPopularMovies,
    },
    {
      title: "New Released Movies",
      content: nowPlayingMovies,
      isLoading: isLoadingNowPlayingMovies,
      error: errorNowPlayingMovies,
    },
    {
      title: "Top Rated Movies",
      content: topRatedMovies,
      isLoading: isLoadingTopRatedMovies,
      error: errorTopRatedMovies,
    },
    {
      title: "Upcoming Movies",
      content: upcomingMovies,
      isLoading: isLoadingUpcomingMovies,
      error: errorUpcomingMovies,
    },
    {
      title: "Airing Today Shows",
      content: airingTodayTvShows,
      isLoading: isLoadingAiringTodayTvShows,
      error: errorAiringTodayTvShows,
    },
    {
      title: "On The Air Shows",
      content: onTheAirTvShows,
      isLoading: isLoadingOnTheAirTvShows,
      error: errorOnTheAirTvShows,
    },
    {
      title: "Popular Shows",
      content: popularTvShows,
      isLoading: isLoadingPopularTvShows,
      error: errorPopularTvShows,
    },
    {
      title: "Top Rated Shows",
      content: topRatedTvShows,
      isLoading: isLoadingTopRatedTvShows,
      error: errorTopRatedTvShows,
    },
  ];

  return (
    <div className="content-lists">
      {contentLists.map(({ title, content, isLoading, error }, index) => {
        if (isLoading)
          return (
            <article key={index}>
              <span aria-busy="true">Loading {title}...</span>
            </article>
          );
        if (error)
          return (
            <article key={index}>
              Error loading {title}: {error}
            </article>
          );

        return <ContentList key={index} title={title} content={content} />;
      })}
    </div>
  );
};

export default HomePage;
