import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
const app: Application = express();

// routing files
const userRoutes = require("./routes/user");
const recipeBoxRoutes = require("./routes/recipeBox");
const recipeRoutes = require("./routes/recipe");

// configure .env variables
dotenv.config();

// configure cors
var whitelist = [
  "https://online-recipe-book.vercel.app",
  "http://localhost:3000",
];
var corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.options("*", cors());

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
