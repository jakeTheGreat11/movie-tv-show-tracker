import express from "express";
import {
  handleWatchlistStatus,
  getWatchlistStatus,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/status", handleWatchlistStatus);

router.get("/status", getWatchlistStatus);

export default router;
