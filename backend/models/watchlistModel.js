import db from "../config/db.js";
import axios from "axios";

// Check if the media already exists in the database
const checkAndInsertMedia = async (mediaId, mediaType, mediaDetails) => {
  const existingMedia = await db.query(`SELECT * FROM media WHERE id = $1`, [
    mediaId,
  ]);
  if (!existingMedia.rows.length) {
    const { overview, vote_average, poster_path, id } = mediaDetails;

    const title =
      mediaType === "tv-shows" ? mediaDetails.name : mediaDetails.title;
    const release_date =
      mediaType === "tv-shows" ? null : mediaDetails.release_date;
    const first_air_date =
      mediaType === "tv-shows" ? mediaDetails.first_air_date : null;
    await db.query(
      `INSERT INTO media (id, title, description, release_date, first_air_date, rating, poster_url, tmdb_id, media_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        mediaId,
        title,
        overview,
        release_date,
        first_air_date,
        vote_average,
        poster_path,
        id,
        mediaType,
      ]
    );
  }
};

export const addToWatchlist = async (
  userId,
  mediaId,
  mediaType,
  status,
  mediaDetails
) => {
  await checkAndInsertMedia(mediaId, mediaType, mediaDetails);

  return await db.query(
    `INSERT INTO watchlist (user_id, media_id, media_type, status) VALUES ($1, $2, $3, $4)`,
    [userId, mediaId, mediaType, status]
  );
};

export const updateWatchlistStatus = async (
  userId,
  mediaId,
  mediaType,
  newStatus
) => {
  return await db.query(
    `UPDATE watchlist SET status = $1 WHERE user_id = $2 AND media_id = $3 AND media_type = $4`,
    [newStatus, userId, mediaId, mediaType]
  );
};

export const removeFromWatchlist = async (userId, mediaId, mediaType) => {
  return await db.query(
    `DELETE FROM watchlist WHERE user_id = $1 AND media_id = $2 AND media_type = $3 RETURNING *`,
    [userId, mediaId, mediaType]
  );
};

export const findWatchlistItem = async (userId, mediaId) => {
  const result = await db.query(
    "SELECT * FROM watchlist WHERE user_id = $1 AND media_id = $2",
    [userId, mediaId]
  );
  return result.rows[0]; // Return the first item, or undefined if none exists
};
