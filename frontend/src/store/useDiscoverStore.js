import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useDiscoverStore = create((set) => ({
  discoverMovies: [],
  currentPage: 1,
  totalPages: 1,
  selectedLanguage: "",
  genres: [],
  languages: [],
  minMovieRating: 0,
  isLoading: false,
  error: null,

  setDiscoverMovies: (movies) => set({ discoverMovies: movies }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setGenres: (genres) => set({ genres }),
  setLanguages: (languages) => set({ languages }),
  setMinMovieRating: (rating) => set({ minMovieRating: rating }),

  fetchDiscoverMovies: async (page = 1, language, rating) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/movies/discover`, {
        params: { page, language, rating },
      });
      console.log("fetch discoverd movies response: ", response);
      set((state) => ({
        discoverMovies:
          page === 1
            ? response.data.movies
            : [...state.discoverMovies, ...response.data.movies], // response.data.movies, //might not work [...state.discoverMovies, ...response.data.movies]
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
      const response = await axios.get(`${API_URL}/languages`);
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
