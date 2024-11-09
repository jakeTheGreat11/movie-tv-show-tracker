import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useMediaPageStore = create((set) => ({
  mediaDetails: null,
  isMediaLoading: false,
  isAddToWatchlistLoading: false,
  error: null,
  watchlistStatus: "", // Store the current status: "watched", "watching", "plan-to-watch"
  watchlistAddSuccess: false,
  displayMessage: "",
  watchedEpisodes: [],
  watchedSeasons: [],

  setMediaDetails: (details) => set({ mediaDetails: details }),
  setisMediaLoading: (isLoading) => set({ isMediaLoading: isLoading }),
  setError: (error) => set({ error }),
  setWatchlistStatus: (newStatus) => set({ watchlistStatus: newStatus }),

  //fetches the details of the media that has been clicked on
  fetchDetails: async (id, mediaType) => {
    set({ isMediaLoading: true });
    try {
      const response = await axios.get(`${API_URL}/${mediaType}/${id}`);
      const media = response.data.media;
      set({ mediaDetails: media });
    } catch (error) {
      console.error("Error fetching media details:", error);
      set({ error: "Error fetching media details" });
    } finally {
      set({ isMediaLoading: false });
    }
  },

  //adds and updates media to watchlist of the user
  addMediaToWatchlist: async (mediaId, mediaType, userId, status) => {
    set({ isAddToWatchlistLoading: true });
    console.log("status: ", status);
    try {
      const response = await axios.post(`${API_URL}/watchlist/status`, {
        mediaId,
        mediaType,
        userId,
        status,
      });
      if (response.status === 200) {
        console.log(response.data.message);
        set({
          watchlistAddSuccess: true,
          displayMessage: response.data.message,
          watchlistStatus: status,
        });
        return response.data.message;
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      set({ watchlistAddSuccess: false });
    }
  },

  //fetches the watchlist status to display it on the watch status buttons
  fetchWatchlistStatus: async (userId, mediaId) => {
    try {
      const response = await axios.get(`${API_URL}/watchlist/status`, {
        params: { userId, mediaId },
      });
      set({ watchlistStatus: response.data.status });
    } catch (error) {
      console.error("Error fetching watchlist status:", error);
    }
  },

  fetchWatchedSeasonsAndEpisodes: async (userId, mediaId) => {
    try {
      const response = await axios.get(`${API_URL}/watchlist/watched`, {
        params: { userId, mediaId },
      });

      const { episodes, seasons } = response.data;

      console.log("episodes: ", episodes);
      console.log("seasons: ", seasons);
      set({ watchedEpisodes: episodes, watchedSeasons: seasons });
    } catch (error) {
      console.error("Error fetching watched seasons and episodes: ", error);
    }
  },

  addSeasonToWatchlist: async (userId, mediaId, seasonId, watched) => {
    const isSeason = true;
    try {
      const response = await axios.post(
        `${API_URL}/watchlist/update-watch-progress`,
        { userId, mediaId, seasonId, watched, isSeason }
      );
      set({ displayMessage: response.data.message });
    } catch (error) {
      console.error(
        "Error adding watched seasons to watchlist: ",
        response.data.error
      );
    }
  },
  addEpisodeToWatchlist: async (userId, mediaId, episodeId, watched) => {
    const isSeason = false;
    try {
      const response = await axios.post(
        `${API_URL}/watchlist/update-watch-progress`,
        { userId, mediaId, episodeId, watched, isSeason }
      );
      set({ displayMessage: response.data.message });
    } catch (error) {
      console.error(
        "Error adding watched seasons to watchlist: ",
        response.data.error
      );
    }
  },
}));
