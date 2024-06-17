import express from "express";
import { param } from "express-validator";
import Restaurantcontroller from "../controllers/Restaurantcontroller";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  Restaurantcontroller.getRestaurantById
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  Restaurantcontroller.searchRestaurant
);

export default router;
