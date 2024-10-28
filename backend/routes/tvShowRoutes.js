import express from "express";
import {
  getAiringTodayTvShows,
  getDiscoverTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  getTvShowGenres,
  getTvShowDetails,
} from "../controllers/tvShowController.js";

const router = express.Router();

router.get("/airing-today", getAiringTodayTvShows);
router.get("/on-the-air", getOnTheAirTvShows);
router.get("/popular", getPopularTvShows);
router.get("/top-rated", getTopRatedTvShows);
router.get("/discover", getDiscoverTvShows);
router.get("/genres", getTvShowGenres);
router.get("/:id", getTvShowDetails);

export default router;
