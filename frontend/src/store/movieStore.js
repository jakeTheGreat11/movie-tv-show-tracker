import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const useMovieStore = create((set) => ({
  popularMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  isLoading: false,
  error: null,

  fetchPopularMovies: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/popular`, {
        params: { page },
      });
      console.log(response);
      set({ popularMovies: response.data.movies, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error fetching the movies.",
        isLoading: false,
      });
      throw error;
    }
  },
  fetchNowPlayingMovies: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/now-playing`, {
        params: { page },
      });
      console.log(response);
      set({ nowPlayingMovies: response.data.movies, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error fetching the movies.",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchUpcomingMovies: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/upcoming`, {
        params: { page },
      });
      console.log(response);
      set({ upcomingMovies: response.data.movies, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error fetching the movies.",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchTopRatedMovies: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/top-rated`, {
        params: { page },
      });
      console.log(response);
      set({ topRatedMovies: response.data.movies, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error fetching the movies.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
