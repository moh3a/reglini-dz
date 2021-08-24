import dbConnect from "../../../config/db";

import Product from "../../../models/Product";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products, status: 200 });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "server error", success: false, status: 500 });
    }
  } else if (req.method === "POST") {
    try {
      const { name, slug, description, price, countInStock, imageUrl } =
        req.body;
      const product = await Product.create({
        name,
        slug,
        description,
        price,
        countInStock,
        imageUrl,
      });
      res.status(200).json({ success: true, product, status: 200 });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "server error", success: false, status: 500 });
    }
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
