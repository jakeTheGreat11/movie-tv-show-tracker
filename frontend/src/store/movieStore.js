import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/movies";

export const useMovieStore = create((set) => ({
  popularMovies: [],
  nowPlayingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  discoverMovies: [],
  currentPage: 1,
  totalPages: 1,
  languages: [],
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

  fetchDiscoverMovies: async (page = 1, language) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/discover`, {
        params: { page, language },
      });
      console.log("fetch discoverd movies response: ", response);
      set((state) => ({
        discoverMovies: response.data.movies, //might not work [...state.discoverMovies, ...response.data.movies]
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error || "Error fetching the movies.",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchLanguages: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:5000/api/languages`);
      const languagesArray = response.data; // Extract the languages array
      set({ languages: languagesArray, isLoading: false });
    } catch (error) {
      set({
        error: error || "Error fetching languages.",
        isLoading: false,
      });
      throw error;
    }
  },
}));
