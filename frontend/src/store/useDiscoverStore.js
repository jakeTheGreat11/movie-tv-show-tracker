import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useDiscoverStore = create((set) => ({
  discoverMovies: [],
  currentPage: 1,
  totalPages: 1,
  selectedLanguage: "",
  languages: [],
  genres: [],
  selectedGenres: [],
  minMovieRating: 0,
  selectedSortBy: "",
  selectedYear: "",
  isMoviesLoading: false,
  isGenresLoading: false,
  isLanguagesLoading: false,
  error: null,
  sortOptions: [
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "release_date.asc", label: "Release Date Ascending" },
    { value: "release_date.desc", label: "Release Date Descending" },
    { value: "vote_average.asc", label: "Vote Average Ascending" },
    { value: "vote_average.desc", label: "Vote Average Descending" },
    { value: "title.asc", label: "Title A-Z" },
    { value: "title.desc", label: "Title Z-A" },
  ],

  setDiscoverMovies: (movies) => set({ discoverMovies: movies }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setMinMovieRating: (rating) => set({ minMovieRating: rating }),
  setSortBy: (sortby) => set({ selectedSortBy: sortby }),
  setSelectedYear: (year) => set({ selectedYear: year }),
  setSelectedGenres: (genre) =>
    set((state) => {
      const isAlreadySelected = state.selectedGenres.includes(genre);
      return {
        selectedGenres: isAlreadySelected
          ? state.selectedGenres.filter((g) => g !== genre)
          : [...state.selectedGenres, genre],
      };
    }),

  // Fetching Movies with language rating genre sort_by method and release year filters
  fetchDiscoverMovies: async (
    page = 1,
    language,
    rating,
    genres,
    sort_by,
    primary_release_year
  ) => {
    set({ isMoviesLoading: true, error: null });
    const genre = genres.join(",");

    try {
      const response = await axios.get(`${API_URL}/movies/discover`, {
        params: {
          page,
          language,
          rating,
          genre,
          sort_by,
          primary_release_year,
        },
      });
      set((state) => ({
        discoverMovies:
          page === 1
            ? response.data.movies
            : [...state.discoverMovies, ...response.data.movies], // For loading more movies
        isMoviesLoading: false,
      }));
    } catch (error) {
      set({
        error: error || "Error fetching the movies.",
        isMoviesLoading: false,
      });
    }
  },

  // Fetching Languages
  fetchLanguages: async () => {
    set({ isLanguagesLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/languages`);
      set({ languages: response.data, isLanguagesLoading: false });
    } catch (error) {
      set({
        error: error || "Error fetching languages.",
        isLanguagesLoading: false,
      });
    }
  },

  // Fetching Genres
  fetchMovieGenres: async () => {
    set({ isGenresLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/movies/genres`);
      set({ genres: response.data.genres, isGenresLoading: false });
    } catch (error) {
      set({
        error: error || "Error fetching genres.",
        isGenresLoading: false,
      });
    }
  },
}));
