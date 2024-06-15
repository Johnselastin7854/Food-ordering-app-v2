import mongoose from "mongoose";

const menuItemsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
});

const resturantschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurantName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  estimatedDeliveryTime: {
    type: Number,
    required: true,
  },
  cuisines: [
    {
      type: String,
      required: true,
    },
  ],
  menuItems: [menuItemsSchema],
  imageUrl: {
    type: String,
    // required: true,
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const Restaurant = mongoose.model("Restaurant", resturantschema);

export default Restaurant;
