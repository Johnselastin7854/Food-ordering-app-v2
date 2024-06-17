import express from "express";
import { param } from "express-validator";
import Restaurantcontroller from "../controllers/Restaurantcontroller";

const router = express.Router();

router.get(
  "/search/:id",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  Restaurantcontroller.searchRestaurant
);

export default router;
