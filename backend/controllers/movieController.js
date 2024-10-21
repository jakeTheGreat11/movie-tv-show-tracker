import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;

const fetchMovies = async (endpoint, page, params = {}) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${endpoint}`;
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
        ...params,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
};

export const getPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await fetchMovies("popular", page);

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getNowPlayingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await fetchMovies("now_playing", page);

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTopRatedMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await fetchMovies("top_rated", page);

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUpcomingMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await fetchMovies("upcoming", page);

    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDiscoverMovies = async (req, res) => {
  const {
    genre,
    sort_by,
    primary_release_year,
    language,
    rating,
    page = 1,
  } = req.query;

  const url = `https://api.themoviedb.org/3/discover/movie`;

  const params = {
    api_key: apiKey,
    sort_by: sort_by || "popularity.desc",
    with_genres: genre || "",
    primary_release_year: primary_release_year || "",
    with_original_language: language || "en-US",
    vote_average_gte: rating || undefined,
    page: page, //dont forget to include page
  };

  try {
    const response = await axios.get(url, { params }); //might not work due to request params not sent right
    const movies = response.data.results;
    res.status(200).json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching movies getDiscoverMovies:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
