import express from "express";
import {
  getMovieSearch,
  getTvShowSearch,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/movies", getMovieSearch);
router.get("/tv-shows", getTvShowSearch);

export default router;
