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

export const getAllUserRecipes = async (userId: string) => {
  const response = await pool.query(
    "SELECT * FROM recipe WHERE user_id=$1 AND is_active=true",
    [userId]
  );
  return response.rows;
};

export const getAllUserRecipeBoxes = async (userId: string) => {
  const response = await pool.query(
    "SELECT * FROM recipe_box WHERE user_id=$1 AND is_active=true",
    [userId]
  );
  return response.rows;
};

export const getAllVerifiedUsersRecipeBoxes = async () => {
  const response = await pool.query(
    "SELECT * FROM recipe_box JOIN app_user ON recipe_box.user_id = app_user.user_id WHERE app_user.verified = true AND recipe_box.is_active=true;"
  );
  return response.rows;
};

export const getAllVerifiedUsersRecipes = async () => {
  const response = await pool.query(
    "SELECT * FROM recipe JOIN recipe_box ON recipe.recipe_box_id = recipe_box.recipe_box_id JOIN app_user ON recipe_box.user_id = app_user.user_id WHERE recipe_box.is_public=true AND app_user.verified = true AND recipe.is_active=true;"
  );
  return response.rows;
};

export const getRecipeBoxRecipes = async (recipe_box_id: string) => {
  const response = await pool.query(
    "SELECT * FROM recipe WHERE recipe_box_id=$1 AND is_active=true",
    [recipe_box_id]
  );
  return response.rows;
};

export const createRecipeBox = async (
  userId: string,
  name: string,
  description: string,
  emoji: string,
  color: string
) => {
  const response = await pool.query(
    `INSERT INTO "recipe_box" (user_id, name, description, emoji, color) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, name, description, emoji, color]
  );
  return response.rows;
};

export const getRecipeBox = async (recipe_box_id: string) => {
  const response = await pool.query(
    "SELECT * FROM recipe_box WHERE recipe_box_id=$1 LIMIT 1",
    [recipe_box_id]
  );
  return response.rows;
};

export const updateRecipeBox = async (
  recipe_box_id: BigInt,
  propertiesToUpdate: { [property: string]: string }
) => {
  const properties = getPropertiesToUpdate(propertiesToUpdate);
  const response = await pool.query(
    `UPDATE recipe_box SET ${properties} WHERE recipe_box_id=$1`,
    [recipe_box_id]
  );
  return response.rows;
};

export const deleteRecipeBox = async (recipe_box_id: BigInt) => {
  await pool.query(`UPDATE recipe SET is_active=false WHERE recipe_box_id=$1`, [
    recipe_box_id,
  ]);

  const response = await pool.query(
    `UPDATE recipe_box SET is_active=false WHERE recipe_box_id=$1`,
    [recipe_box_id]
  );
  return response;
};

export const createRecipe = async (
  userId: string,
  name: string,
  link: string,
  description: string,
  has_made: boolean,
  favorite: boolean,
  recipe_box_id: BigInt
) => {
  const response = await pool.query(
    `INSERT INTO "recipe" (user_id, name, link, description, has_made, favorite, recipe_box_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [userId, name, link, description, has_made, favorite, recipe_box_id]
  );
  return response.rows;
};

export const updateRecipe = async (
  recipe_id: BigInt,
  propertiesToUpdate: { [property: string]: string }
) => {
  const properties = getPropertiesToUpdate(propertiesToUpdate);

  const response = await pool.query(
    `UPDATE recipe SET ${properties} WHERE recipe_id=$1`,
    [recipe_id]
  );
  return response.rows;
};

export const deleteRecipe = async (recipe_id: BigInt) => {
  const response = await pool.query(
    `UPDATE recipe SET is_active=false WHERE recipe_id=$1`,
    [recipe_id]
  );
  return response;
};

export const getRecipeBoxFromRecipe = async (recipeId: BigInt) => {
  const response = await pool.query(
    `SELECT recipe_box_id FROM recipe WHERE recipe_id=$1 LIMIT 1`,
    [recipeId]
  );
  return response.rows;
};
