require("dotenv").config();
import dbConnect from "../../../../../config/db";
import User from "../../../../../models/User";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { name } = req.body;
    const user = await User.findOne({ account: "credentials", name });
    if (user) {
      res.status(200).json({ success: false, message: "Username taken." });
    } else {
      res.status(200).json({ success: true, message: "Username available." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
