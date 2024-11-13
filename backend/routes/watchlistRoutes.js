import express from "express";
import {
  handleWatchlistStatus,
  getWatchlistStatus,
  fetchWatchedSeasonsAndEpisodes,
  updateWatchProgress,
  getAllWatchlistItems,
} from "../controllers/watchlistController.js";

const router = express.Router();

//Used to set or update the status of an item in the watchlist.
router.post("/status", handleWatchlistStatus);

//Retrieves watchlist watchlist status for a specific media.
router.get("/status", getWatchlistStatus);

//Fetches items that have been fully watched (i.e., completed seasons or episodes)
router.get("/watched", fetchWatchedSeasonsAndEpisodes);

//Updates the progress of a particular item (for example, marking an episode or season as watched)
router.post("/update-watch-progress", updateWatchProgress);

router.get("/", getAllWatchlistItems);

export default router;
