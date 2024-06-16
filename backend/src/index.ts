import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/UserRoute";
import myRestaurantRoute from "./routes/MyRestaurant";
import RestaurantRoute from "./routes/RestaurantRoute";
import { v2 as cloudinary } from "cloudinary";
// import path from "path";
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/health", async (req: Request, res: Response) => {
//   res.send({ messgae: "Health is OK!" });
// });

app.use("/api/user", userRoute);

app.use("/api/my/restaurant", myRestaurantRoute);

app.use("/api/restaurant", RestaurantRoute);

app.listen(7000, () => {
  console.log(`Listening on POrt Number 7000`);
});
