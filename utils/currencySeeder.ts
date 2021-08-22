require("dotenv").config();
import dbConnect from "../config/db";
import Currency from "../models/Currency";

export const importData = async () => {
  await dbConnect();
  try {
    await Currency.insertMany({
      exchange: "DZDEUR",
      historical: [],
    });
    console.log("Cart Items added successfully");
    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();
