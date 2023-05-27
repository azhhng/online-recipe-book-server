import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

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

app.use("/", (req: Request, res: Response): void => {
  res.send("Hello world!");
});

app.listen(process.env.PORT_NUMBER, (): void => {
  console.log("Server is up on port:", process.env.PORT_NUMBER);
});
