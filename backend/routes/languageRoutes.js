import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/languages", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/configuration/languages",
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching languages:", error);
    res.status(500).json({ error: "Failed to fetch languages" });
  }
});

export default router;
