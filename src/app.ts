import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user";
import recipeBoxRouter from "./routes/recipeBox";
import recipeRouter from "./routes/recipe";
const app: Application = express();

// configure .env variables
dotenv.config();

// configure cors
const whitelist = ["https://recipeboxd.vercel.app", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// handle routing
app.use("/user", userRouter);
app.use("/recipe-box", recipeBoxRouter);
app.use("/recipe", recipeRouter);

app.use("/", (req: Request, res: Response): void => {
  res.send("The online-recipe-book API is connected.");
});

app.listen(process.env.PORT_NUMBER, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
