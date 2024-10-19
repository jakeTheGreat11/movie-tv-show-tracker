import express from "express";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
} from "../controllers/movieController.js";

const router = express.Router();

// Route to get popular movies
router.get("/movies/popular", getPopularMovies);
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/discover", getDiscoverMovies);

export default router;
