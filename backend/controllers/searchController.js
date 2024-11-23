import axios from "axios";

const apiKey = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const getMovieSearch = async (req, res) => {
  const { query, page = 1 } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: apiKey,
        query,
        page,
      },
    });

    const { results, total_results, total_pages } = response.data;

    return res.status(200).json({
      results,
      total_results,
      total_pages,
      current_page: page,
    });
  } catch (error) {
    console.error("Error searching movies:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch movie search results" });
  }
};

export const getTvShowSearch = async (req, res) => {
  const { query, page = 1 } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        page,
      },
    });

    const { results, total_results, total_pages } = response.data;

    return res.status(200).json({
      results,
      total_results,
      total_pages,
      current_page: page,
    });
  } catch (error) {
    console.error("Error searching TV shows:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch TV show search results" });
  }
};
