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

    if (existingItem) {
      if (existingItem.status === status) {
        //if it exist remove it from watchlist
        const removedItem = await removeFromWatchlist(userId, mediaId);
        return res.json({ message: "Removed from watchlist", removedItem });
      } else {
        // Otherwise, update the status
        const updatedItem = await updateWatchlistStatus(
          userId,
          mediaId,
          status
        );
        return res.json({ message: "Watchlist status updated", updatedItem });
      }
    } else {
      // If not in the watchlist, add it
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
