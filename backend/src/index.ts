import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import path from "path";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.listen(7000, () => {
  console.log(`Listening on POrt Number 7000`);
});
