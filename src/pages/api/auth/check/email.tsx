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
    const { email } = req.body;
    const user = await User.findOne({ account: "credentials", email });
    if (user) {
      res
        .status(200)
        .json({ success: false, message: "Email already exists." });
    } else {
      res.status(200).json({ success: true, message: "Email accepted." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
