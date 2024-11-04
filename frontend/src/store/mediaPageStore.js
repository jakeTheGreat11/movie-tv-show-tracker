import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useMediaPageStore = create((set) => ({
  mediaDetails: null,
  isMediaLoading: false,
  isAddToWatchlistLoading: false,
  error: null,
  watchlistStatus: "", // Store the current status: "watched", "watching", "plan-to-watch"
  showAccordion: true,
  watchlistAddSuccess: false,
  displayMessage: "",
  setMediaDetails: (details) => set({ mediaDetails: details }),
  setisMediaLoading: (isLoading) => set({ isMediaLoading: isLoading }),
  setError: (error) => set({ error }),
  setWatchlistStatus: (newStatus) => set({ watchlistStatus: newStatus }),
  toggleAccordion: (show) => set({ showAccordion: show }),

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

  addToWatchlist: async (mediaId, mediaType, userId, status) => {
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
}));
