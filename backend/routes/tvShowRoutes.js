import express from "express";
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from "../controllers/tvShowController.js";

const router = express.Router();

router.get("/airing-today", getAiringTodayTvShows);
router.get("/on-the-air", getOnTheAirTvShows);
router.get("/popular", getPopularTvShows);
router.get("/top-rated", getTopRatedTvShows);

export default router;
