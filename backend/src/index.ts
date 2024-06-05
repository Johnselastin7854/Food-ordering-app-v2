import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/UserRoute";
// import path from "path";
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

app.get("/api/test", async (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.listen(7000, () => {
  console.log(`Listening on POrt Number 7000`);
});
