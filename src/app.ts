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

app.get("/test-get", (req, res) => {
  res.status(200).send("test get success");
});

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

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

app.listen(process.env.PORT_NUMBER, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
