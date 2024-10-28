import express from "express";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
  getMovieGenres,
  getMovieDetails,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/now-playing", getNowPlayingMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/discover", getDiscoverMovies);
router.get("/genres", getMovieGenres);
router.get("/:id", getMovieDetails);

export default router;
