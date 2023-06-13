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

const getPropertiesToUpdate = (propertiesToUpdate: {
  [property: string]: string;
}) => {
  let properties = "";

  for (let property in propertiesToUpdate) {
    properties += property;
    properties += "=";
    properties += "'";
    properties += propertiesToUpdate[property];
    properties += "'";
    properties += ",";
  }

  properties = properties.slice(0, -1);
  return properties;
};

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
  description: string,
  emoji: string,
  color: string
) => {
  const response = await pool.query(
    `INSERT INTO "recipe_box" (user_id, recipe_box_id, name, description, emoji, color) VALUES ($1, nextval('recipe_box_id_sequence'), $2, $3, $4, $5) RETURNING *`,
    [userId, name, description, emoji, color]
  );
  return response.rows;
};

const updateRecipeBox = async (
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

const deleteRecipeBox = async (recipe_box_id: string) => {
  const recipe_response = await pool.query(
    `DELETE FROM recipe WHERE recipe_box_id=$1`,
    [recipe_box_id]
  );

  const recipe_box_response = await pool.query(
    `DELETE FROM recipe_box WHERE recipe_box_id=$1`,
    [recipe_box_id]
  );
  return recipe_box_response;
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

const updateRecipe = async (
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

const deleteRecipe = async (recipe_id: string) => {
  const response = await pool.query(`DELETE FROM recipe WHERE recipe_id=$1`, [
    recipe_id,
  ]);
  return response;
};

const deleteUser = async (user_id: string) => {
  await pool.query(`DELETE FROM recipe WHERE user_id=$1`, [user_id]);
  await pool.query(`DELETE FROM recipe_box WHERE user_id=$1`, [user_id]);
  const response = await pool.query(`DELETE FROM app_user WHERE user_id=$1`, [
    user_id,
  ]);
  return response;
};

const createUser = async (
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

const getUser = async (userId: string) => {
  const response = await pool.query(`SELECT * FROM app_user WHERE user_id=$1`, [
    userId,
  ]);
  return response.rows;
};

const updateUser = async (
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

module.exports = {
  getAllUserRecipes,
  getAllUserRecipeBoxes,
  createRecipeBox,
  updateRecipeBox,
  deleteRecipeBox,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteUser,
  createUser,
  getUser,
  updateUser,
};
