import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.patch("/avatar", async (req, res) => {
  const { userId, avatar } = req.body;

  if (!avatar || !userId) {
    return res
      .status(400)
      .json({ error: "Missing user ID or avatar selection." });
  }

  try {
    const updateQuery = `
        UPDATE users
        SET avatar = $1
        WHERE id = $2;
      `;
    await db.query(updateQuery, [avatar, userId]);
    res.status(200).json({ message: "Avatar updated successfully." });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
