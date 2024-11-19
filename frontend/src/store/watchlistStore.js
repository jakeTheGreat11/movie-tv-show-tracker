import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const useWatchlistStore = create((set) => ({
  watchlistMedia: [],
  isLoading: false,
  error: null,

  fetchWatchlist: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/watchlist?userId=${userId}`);
      set({ watchlistMedia: response.data.watchlistList });
    } catch (error) {
      set({ error: "Failed to load watchlist" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
