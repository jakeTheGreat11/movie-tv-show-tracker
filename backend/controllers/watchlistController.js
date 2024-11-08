import {
  findWatchlistItem,
  addToWatchlist,
  updateWatchlistStatus,
  removeFromWatchlist,
} from "../models/watchlistModel.js";
import db from "../config/db.js";
import { fetchMediaDetails } from "../utils/mediaUtils.js";

export const handleWatchlistStatus = async (req, res) => {
  const { userId, mediaId, mediaType, status } = req.body;
  try {
    const mediaDetails = await fetchMediaDetails(mediaId, mediaType);

    const existingItem = await findWatchlistItem(userId, mediaId);
    console.log("status: ", status);

    if (existingItem) {
      console.log("existingItem.status: ", existingItem.status);
      if (existingItem.status === status) {
        //if it exist remove it from watchlist
        console.log("in remove to watchlist if statement");
        const removedItem = await removeFromWatchlist(
          userId,
          mediaId,
          mediaType
        );
        return res.json({ message: "Removed from watchlist", removedItem });
      } else {
        // Otherwise, update the status
        console.log("in update to watchlist if statement");
        const updatedItem = await updateWatchlistStatus(
          userId,
          mediaId,
          mediaType,
          status
        );
        return res.json({ message: "Watchlist status updated", updatedItem });
      }
    } else {
      // If not in the watchlist, add it
      console.log("in add to watchlist if statement");
      const newItem = await addToWatchlist(
        userId,
        mediaId,
        mediaType,
        status,
        mediaDetails
      );
      return res.json({ message: "Added to watchlist", newItem });
    }
  } catch (error) {
    console.error("Error handling watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getWatchlistStatus = async (req, res) => {
  const { userId, mediaId } = req.query;

  try {
    const query = `
        SELECT * FROM watchlist 
        WHERE user_id = $1 AND media_id = $2 ;
      `;
    const result = await db.query(query, [userId, mediaId]);

    if (result.rows.length > 0) {
      return res.status(200).json({ status: result.rows[0].status });
    } else {
      return res.status(200).json({ status: "" }); // Not in watchlist it was null
    }
  } catch (error) {
    console.error("Error fetching watchlist status:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the watchlist status" });
  }
};

export const fetchWatchedSeasonsAndEpisodes = async (req, res) => {
  const { userId, mediaId } = req.query;
  try {
    const episodeQuery = `
      SELECT episode_id, watched 
      FROM user_episode_watches uep
      WHERE uep.user_id = $2 AND uep.media_id = $1
      `;
    const episodes = db.query(episodeQuery, [userId, mediaId]);

    const seasonsQuery = `
      SELECT season_id, watched 
      FROM user_season_watches usp
      WHERE usp.user_id = $2 AND usp.media_id = $1
      `;
    const seasons = db.query(seasonsQuery, [userId, mediaId]);

    res.status(200).json({ episodes, seasons });
  } catch (error) {
    console.error("Error fetching season and episode progress:", error);
    throw new Error("Internal server error");
  }
};

// updateWatchProgress function
export const updateWatchProgress = async (req, res) => {
  const { userId, mediaId, episodeId, seasonId, isSeason, watched } = req.body;

  try {
    if (isSeason) {
      // Update the season watch status
      const query = `
        INSERT INTO user_season_watches (user_id, media_id, season_id, watched, watched_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (user_id, season_id)
        DO UPDATE SET watched = $4, watched_at = NOW();
      `;
      await db.query(query, [userId, mediaId, seasonId, watched]);
      return res.json({ message: "Season watch progress updated" });
    } else {
      // Update the episode watch status
      const query = `
        INSERT INTO user_episode_watches (user_id, media_id, episode_id, watched, watched_at)
        VALUES ($1, $2, $3, $4, NOW())
        ON CONFLICT (user_id, episode_id)
        DO UPDATE SET watched = $4, watched_at = NOW();
      `;
      await db.query(query, [userId, mediaId, episodeId, watched]);
      return res.json({ message: "Episode watch progress updated" });
    }
  } catch (error) {
    console.error("Error updating watch progress:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
