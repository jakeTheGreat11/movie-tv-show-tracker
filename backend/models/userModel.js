import db from "../config/db.js";

export const createUser = async (email, username, hashedPassword) => {
  const insertUserQuery = `
        INSERT INTO users (email, username, password)
        VALUES ($1, $2, $3) RETURNING id, email, username
    `;
  const result = await db.query(insertUserQuery, [
    email,
    username,
    hashedPassword,
  ]);
  return result.rows[0]; // Return the new user
};

export const findUserByEmail = async (email) => {
  const findUserQuery = `SELECT id, email, username, avatar FROM users WHERE email = $1`;
  const result = await db.query(findUserQuery, [email]);
  return result.rows[0]; // Return the user if found
};

export const findUserById = async (userId) => {
  const findUserQuery = `SELECT id, email, username, avatar FROM users WHERE id = $1`;
  const result = await db.query(findUserQuery, [userId]);
  return result.rows[0]; // Return the user if found
};
