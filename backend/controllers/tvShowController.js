import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;

const fetchTvShows = async (endpoint, page, params = {}) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${endpoint}`;
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
    throw new Error("Error fetching TV shows: " + error.message);
  }
};

export const getAiringTodayTvShows = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const tvShows = await fetchTvShows("airing_today", page);
    res.status(200).json({ success: true, tvShows });
  } catch (error) {
    console.error("Error fetching airing today TV shows:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getOnTheAirTvShows = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const tvShows = await fetchTvShows("on_the_air", page);
    res.status(200).json({ success: true, tvShows });
  } catch (error) {
    console.error("Error fetching on the air TV shows:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPopularTvShows = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const tvShows = await fetchTvShows("popular", page);
    res.status(200).json({ success: true, tvShows });
  } catch (error) {
    console.error("Error fetching popular TV shows:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTopRatedTvShows = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const tvShows = await fetchTvShows("top_rated", page);
    res.status(200).json({ success: true, tvShows });
  } catch (error) {
    console.error("Error fetching top-rated TV shows:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDiscoverTvShows = async (req, res) => {
  const {
    genre,
    sort_by,
    first_air_date_year,
    language,
    rating,
    page = 1,
  } = req.query;

  const url = `https://api.themoviedb.org/3/discover/tv`;

  const params = {
    api_key: apiKey,
    sort_by: sort_by || "popularity.desc",
    with_genres: genre || "",
    first_air_date_year: first_air_date_year || "",
    "vote_average.gte": rating || undefined,
    page: page,
  };
  if (language) {
    params.with_original_language = language;
  }

  try {
    const response = await axios.get(url, { params });
    const tvShows = response.data.results;
    res.status(200).json({ success: true, "tv-shows": tvShows });
  } catch (error) {
    console.error("Error fetching discovered TV shows:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTvShowGenres = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );
    const genres = response.data.genres;
    res.status(200).json({ success: true, genres });
  } catch (error) {
    console.error("Error fetching TV show genres:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTvShowDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        // dont forget to add append_to_response
      },
    });
    res.status(200).json({ success: true, media: response.data }); //response.data
  } catch (error) {
    console.error("Error fetching TV show details: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
