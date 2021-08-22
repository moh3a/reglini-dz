import dbConnect from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import Currency from "../../../models/Currency";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const data = await Currency.find();
      res.status(200).json({ success: true, data });
    } catch (e) {
      res
        .status(400)
        .json({ success: false, message: "An error have occured." });
    }
  } else if (req.method === "POST") {
    const { exchange, historical } = req.body;
    const data = await Currency.findOne({ exchange });
    if (!data)
      res
        .status(404)
        .json({ success: false, message: "Currency doesnt exist" });
    data.historical.push(historical);
    await data.save();
    res.status(201).json({ success: true, data });
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
