import express from "express";
import {
  handleWatchlistStatus,
  getWatchlistStatus,
  fetchWatchedSeasonsAndEpisodes,
  updateWatchProgress,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/status", handleWatchlistStatus);

router.get("/status", getWatchlistStatus);

router.get("/watched", fetchWatchedSeasonsAndEpisodes);
router.post("/update-watch-progress", updateWatchProgress);

export default router;
