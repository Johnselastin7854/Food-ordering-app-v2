import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.send(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (err) {
    console.log(err);
    return res.send(500).json({ message: "Someting went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    const exsisitingUser = await User.findOne({ auth0Id });

    if (exsisitingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Error creating User" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ messgae: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Error updating User Details" });
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
