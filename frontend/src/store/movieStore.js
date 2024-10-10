import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const useMovieStore = create((set) => ({
    movies: [],
    isLoading: false,
    error: null,

    fetchMovies: async (page = 1) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/movies`);
            console.log(response);
            set({ movies: response.data.results, isLoading:false });
        } catch (error) {
            set({error:error.response.data.message || "Error fetching the movies.", isLoading:false})
            throw error;
        }
    }

}));