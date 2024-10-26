import express from "express";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getDiscoverMovies,
  getGenres,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/popular", getPopularMovies);
router.get("/now-playing", getNowPlayingMovies);
router.get("/top-rated", getTopRatedMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/discover", getDiscoverMovies);
router.get("/genres", getGenres);

export default router;
