import { create } from "zustand";
import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;
const API_URL = `${BASE_API_URL}/tv-shows`;

export const useTvShowStore = create((set) => ({
  airingTodayTvShows: [],
  onTheAirTvShows: [],
  popularTvShows: [],
  topRatedTvShows: [],
  isLoadingAiringTodayTvShows: false,
  isLoadingOnTheAirTvShows: false,
  isLoadingPopularTvShows: false,
  isLoadingTopRatedTvShows: false,
  errorAiringTodayTvShows: null,
  errorOnTheAirTvShows: null,
  errorPopularTvShows: null,
  errorTopRatedTvShows: null,

  fecthAiringTodayTvShows: async (page = 1) => {
    set({ isLoadingAiringTodayTvShows: true, errorAiringTodayTvShows: null });
    try {
      const response = await axios.get(`${API_URL}/airing-today`, {
        params: { page },
      });
      set({
        airingTodayTvShows: response.data.tvShows,
        isLoadingAiringTodayTvShows: false,
      });
    } catch (error) {
      set({
        errorAiringTodayTvShows:
          error.response?.data?.message ||
          "Error fetching airing today TV shows.",
      });
      throw error;
    }
  },
  fetchOnTheAirTvShows: async (page = 1) => {
    set({ isLoadingOnTheAirTvShows: true, errorOnTheAirTvShows: null });
    try {
      const response = await axios.get(`${API_URL}/on-the-air`, {
        params: { page },
      });
      set({
        onTheAirTvShows: response.data.tvShows,
        isLoadingOnTheAirTvShows: false,
      });
    } catch (error) {
      set({
        errorOnTheAirTvShows:
          error.response?.data?.message ||
          "Error fetching on-the-air TV shows.",
      });
      set({ isLoadingOnTheAirTvShows: false });
    }
  },

  fetchPopularTvShows: async (page = 1) => {
    set({ isLoadingPopularTvShows: true, errorPopularTvShows: null });
    try {
      const response = await axios.get(`${API_URL}/popular`, {
        params: { page },
      });
      set({
        popularTvShows: response.data.tvShows,
        isLoadingPopularTvShows: false,
      });
    } catch (error) {
      set({
        errorPopularTvShows:
          error.response?.data?.message || "Error fetching popular TV shows.",
      });
      set({ isLoadingPopularTvShows: false });
    }
  },

  fetchTopRatedTvShows: async (page = 1) => {
    set({ isLoadingTopRatedTvShows: true, errorTopRatedTvShows: null });
    try {
      const response = await axios.get(`${API_URL}/top-rated`, {
        params: { page },
      });
      set({
        topRatedTvShows: response.data.tvShows,
        isLoadingTopRatedTvShows: false,
      });
    } catch (error) {
      set({
        errorTopRatedTvShows:
          error.response?.data?.message || "Error fetching top-rated TV shows.",
      });
      set({ isLoadingTopRatedTvShows: false });
    }
  },
}));
