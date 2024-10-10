import express from 'express';
import { getPopularMovies } from '../controllers/movieController.js';

const router = express.Router();

// Route to get popular movies
router.get('/movies', getPopularMovies);

export default router;