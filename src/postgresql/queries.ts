import * as dotenv from "dotenv";
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

const getAllUserRecipes = async (userId: string) => {
  const response = await pool.query("SELECT * FROM recipe WHERE user_id=$1", [
    userId,
  ]);
  return response.rows;
};

const getAllUserRecipeBoxes = async (userId: string) => {
  const response = await pool.query(
    "SELECT * FROM recipe_box WHERE user_id=$1",
    [userId]
  );
  return response.rows;
};

const createRecipeBox = async (
  userId: string,
  name: string,
  description: string
) => {
  const response = await pool.query(
    `INSERT INTO "recipe_box" (user_id, recipe_box_id, name, description) VALUES ($1, nextval('recipe_box_id_sequence'), $2, $3) RETURNING *`,
    [userId, name, description]
  );
  return response.rows;
};

const createRecipe = async (
  userId: string,
  name: string,
  link: string,
  description: string,
  has_made: boolean,
  favorite: boolean,
  recipe_box_id: BigInt
) => {
  const response = await pool.query(
    `INSERT INTO "recipe" (recipe_id, user_id, name, link, description, has_made, favorite, recipe_box_id)
    VALUES (nextval('recipe_id_sequence'), $1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [userId, name, link, description, has_made, favorite, recipe_box_id]
  );
  return response.rows;
};

module.exports = {
  getAllUserRecipes,
  getAllUserRecipeBoxes,
  createRecipeBox,
  createRecipe,
};
