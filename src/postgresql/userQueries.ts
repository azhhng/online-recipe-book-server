import * as dotenv from "dotenv";
import { getPropertiesToUpdate } from "./helpers";
// configure .env variables
dotenv.config();

// configure database
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});

export const deleteUser = async (user_id: string) => {
  await pool.query(`DELETE FROM recipe WHERE user_id=$1`, [user_id]);
  await pool.query(`DELETE FROM recipe_box WHERE user_id=$1`, [user_id]);
  const response = await pool.query(`DELETE FROM app_user WHERE user_id=$1`, [
    user_id,
  ]);
  return response;
};

export const createUser = async (
  userId: string,
  name: string,
  emoji: string,
  color: string
) => {
  const response = await pool.query(
    `INSERT INTO "app_user" (user_id, emoji, color, name)
      VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, emoji, color, name]
  );
  return response.rows;
};

export const getUser = async (userId: string) => {
  const response = await pool.query(
    `SELECT * FROM app_user WHERE user_id=$1 LIMIT 1`,
    [userId]
  );
  return response.rows;
};

export const updateUser = async (
  user_id: string,
  propertiesToUpdate: { [property: string]: string }
) => {
  const properties = getPropertiesToUpdate(propertiesToUpdate);

  const response = await pool.query(
    `UPDATE app_user SET ${properties} WHERE user_id=$1`,
    [user_id]
  );
  return response.rows;
};

export const getUserFromRecipeBox = async (recipeBoxId: BigInt) => {
  const response = await pool.query(
    `SELECT user_id FROM recipe_box WHERE recipe_box_id=$1 LIMIT 1`,
    [recipeBoxId]
  );
  return response.rows;
};

export const getUserFromRecipe = async (recipeId: BigInt) => {
  const response = await pool.query(
    `SELECT user_id FROM recipe WHERE recipe_id=$1 LIMIT 1`,
    [recipeId]
  );
  return response.rows;
};
