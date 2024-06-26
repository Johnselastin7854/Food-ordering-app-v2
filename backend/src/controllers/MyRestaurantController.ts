import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const exisitingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (!exisitingRestaurant) {
      return res.status(404).json({ messgae: "Restaurant Not Found" });
    }

    res.json(exisitingRestaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Something went wrong" });
  }
};

const createMyRestuarant = async (req: Request, res: Response) => {
  try {
    const exisitingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (exisitingRestaurant) {
      return res
        .status(409)
        .json({ messgae: "User Restaurant already exists" });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image.length}`;

    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const newResturant = new Restaurant(req.body);
    // newResturant.imageUrl = uploadResponse.url;
    newResturant.user = new mongoose.Types.ObjectId(req.userId);
    newResturant.lastUpdate = new Date();

    await newResturant.save();

    res.status(200).send(newResturant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Something went wrong" });
  }
};

const updateMyRestuarant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;

    const restaurant = await Restaurant.findById(req.userId);

    if (!restaurant) {
      return res.status(404).json({ messgae: "User not found" });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;
    restaurant.lastUpdate = new Date();

    await restaurant.save();

    res.send(restaurant);
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export default { createMyRestuarant, getMyRestaurant, updateMyRestuarant };
