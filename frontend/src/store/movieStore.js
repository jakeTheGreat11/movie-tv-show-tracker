import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const useMovieStore = create((set) => ({
  popularMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  isLoadingPopularMovies: false,
  isLoadingNowPlayingMovies: false,
  isLoadingUpcomingMovies: false,
  isLoadingTopRatedMovies: false,
  errorPopularMovies: null,
  errorNowPlayingMovies: null,
  errorUpcomingMovies: null,
  errorTopRatedMovies: null,

  fetchPopularMovies: async (page = 1) => {
    set({ isLoadingPopularMovies: true, errorPopularMovies: null });
    try {
      const response = await axios.get(`${API_URL}/popular`, {
        params: { page },
      });
      set({
        popularMovies: response.data.movies,
        isLoadingPopularMovies: false,
      });
    } catch (error) {
      set({
        errorPopularMovies:
          error.response?.data?.message || "Error fetching popular movies.",
        isLoadingPopularMovies: false,
      });
      throw error;
    }
  },

  fetchNowPlayingMovies: async (page = 1) => {
    set({ isLoadingNowPlayingMovies: true, errorNowPlayingMovies: null });
    try {
      const response = await axios.get(`${API_URL}/now-playing`, {
        params: { page },
      });
      set({
        nowPlayingMovies: response.data.movies,
        isLoadingNowPlayingMovies: false,
      });
    } catch (error) {
      set({
        errorNowPlayingMovies:
          error.response?.data?.message || "Error fetching now playing movies.",
        isLoadingNowPlayingMovies: false,
      });
      throw error;
    }
  },

  fetchUpcomingMovies: async (page = 1) => {
    set({ isLoadingUpcomingMovies: true, errorUpcomingMovies: null });
    try {
      const response = await axios.get(`${API_URL}/upcoming`, {
        params: { page },
      });
      set({
        upcomingMovies: response.data.movies,
        isLoadingUpcomingMovies: false,
      });
    } catch (error) {
      set({
        errorUpcomingMovies:
          error.response?.data?.message || "Error fetching upcoming movies.",
        isLoadingUpcomingMovies: false,
      });
      throw error;
    }
  },

  fetchTopRatedMovies: async (page = 1) => {
    set({ isLoadingTopRatedMovies: true, errorTopRatedMovies: null });
    try {
      const response = await axios.get(`${API_URL}/top-rated`, {
        params: { page },
      });
      set({
        topRatedMovies: response.data.movies,
        isLoadingTopRatedMovies: false,
      });
    } catch (error) {
      set({
        errorTopRatedMovies:
          error.response?.data?.message || "Error fetching top-rated movies.",
        isLoadingTopRatedMovies: false,
      });
      throw error;
    }
  },
}));

// error: error.response.data.message
