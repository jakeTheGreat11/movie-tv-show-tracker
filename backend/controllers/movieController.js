import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;

export const getPopularMovies = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    // Fetch data from the TMDb API
    const response = await axios.get(url);
    const movies = response.data.results;

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getNowPlayingMovies = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;

    const response = await axios.get(url);
    const movies = response.data.results;

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTopRatedMovies = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

    const response = await axios.get(url);
    const movies = response.data.results;

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUpcomingMovies = async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

    const response = await axios.get(url);
    const movies = response.data.results;

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDiscoverMovies = async (req, res) => {
  const { genre, sort_by, primary_release_year, language, rating } = req.query;

  const url = `https://api.themoviedb.org/3/discover/movie`;

  let params = {
    api_key: apiKey,
    include_adult: false,
    include_video: false,
    language: language || "en-US",
    page: 1 || page,
    sort_by: sort_by || "popularity.desc",
    with_genres: genre || "",
    primary_release_year: primary_release_year || "",
  };

  if (rating) {
    params.vote_average_gte = rating; //might cause bug
  }

  try {
    const response = await axios.get(url, { params });
    const movies = response.data.results;
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
