import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";

const app: Application = express();

const PORT: number = 3001;
dotenv.config();

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

app.listen(PORT, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
