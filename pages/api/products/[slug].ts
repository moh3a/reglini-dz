import dbConnect from "../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";

import Product from "../../../models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { slug } = req.query;
  if (req.method === "GET") {
    try {
      const product = await Product.findOne({ slug });
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
      .json({ message: "Page doesn't exist.", succes: false, status: 400 });
  }
}
