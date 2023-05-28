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
  console.log(response.rows);
  return response.rows;
};

module.exports = {
  getAllUserRecipes,
  getAllUserRecipeBoxes,
};
