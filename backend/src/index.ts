import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.send({ message: "Hello" });
});

app.listen(7000, () => {
  console.log(`Listening on POrt Number 7000`);
});
