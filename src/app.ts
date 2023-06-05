import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const userController = require("./controllers/userController");
const app: Application = express();

// configure .env variables
dotenv.config();

// configure cors
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

app.get("/:user/recipe", async (req, res) => {
  const recipes = await userController.getAllUserRecipes(req, res);
  return res.json(recipes);
});

app.get("/:user/recipe-box", async (req, res) => {
  const recipeBoxes = await userController.getAllUserRecipeBoxes(req, res);
  return res.json(recipeBoxes);
});

app.post("/:user/recipe-box", async (req, res) => {
  const recipeBox = await userController.postUserRecipeBox(req, res);
  return res.json(recipeBox);
});

app.put("/recipe-box/:box", async (req, res) => {
  const recipeBox = await userController.putRecipeBox(req, res);
  return res.json(recipeBox);
});

app.delete("/recipe-box/:box", async (req, res) => {
  const recipeBox = await userController.deleteRecipeBox(req, res);
  return res.json(recipeBox);
});

app.post("/:user/recipe", async (req, res) => {
  const recipe = await userController.postUserRecipe(req, res);
  return res.json(recipe);
});

app.put("/recipe/:id", async (req, res) => {
  const recipe = await userController.putRecipe(req, res);
  return res.json(recipe);
});

app.use("/", (req: Request, res: Response): void => {
  res.send("The online-recipe-book API is connected.");
});

app.listen(process.env.PORT_NUMBER, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
