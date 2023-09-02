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

export const createUserTransactionRecipe = async (
  userId: string,
  recipeBoxId: BigInt,
  recipeId: BigInt,
  action: string
) => {
  const currentDate = new Date();
  const response = await pool.query(
    `INSERT INTO "user_transaction" (user_id, recipe_box_id, recipe_id, action, action_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, recipeBoxId, recipeId, action, currentDate]
  );
  return response.rows;
};

export const createUserTransactionRecipeBox = async (
  userId: string,
  recipeBoxId: BigInt,
  action: string
) => {
  const currentDate = new Date();
  const response = await pool.query(
    `INSERT INTO "user_transaction" (user_id, recipe_box_id, action, action_date) VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, recipeBoxId, action, currentDate]
  );
  return response.rows;
};
