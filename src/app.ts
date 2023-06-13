import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const app: Application = express();
const userRoutes = require("./routes/user");
const recipeBoxRoutes = require("./routes/recipeBox");
const recipeRoutes = require("./routes/recipe");

// configure .env variables
dotenv.config();

// configure cors
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

// handle routing
app.use("/user", userRoutes);
app.use("/recipe-box", recipeBoxRoutes);
app.use("/recipe", recipeRoutes);

app.use("/", (req: Request, res: Response): void => {
  res.send("The online-recipe-book API is connected.");
});

app.listen(process.env.PORT_NUMBER, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
