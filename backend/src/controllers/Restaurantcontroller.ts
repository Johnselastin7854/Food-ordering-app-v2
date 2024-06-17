import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  //http://localhost:9000/api/restaurant/search/London?searchQuery=green+salad&sortOption-estimated Delivery Time&selectedCuisines=Salads&page=1
  try {
    const city = req.params.city;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i"); // london===London (ignore case)

    const cityCheck = await Restaurant.countDocuments(query);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      // URL = selectedCuisines = italian,burgers,chinese
      // [italian,burger,chinese]
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      // restrantName = Pizza Corner
      // cuisines = [italian,burgers,chinese]
      // searchQuery=italian
      const searchRegExp = new RegExp(searchQuery, "i");
      query["$or"] = [
        { restaurantName: searchRegExp },
        { cuisines: { $in: [searchRegExp] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurant = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurant,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Something went wrong" });
  }
};

export default { searchRestaurant, getRestaurantById };
