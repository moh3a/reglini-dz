require("dotenv").config();
import dbConnect from "../../../config/db";
import User from "../../../models/User";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, account, provider } = req.body;
    if (account === "credentials") {
      const user = await User.findOne({ account, email });
      res
        .status(200)
        .json({ success: true, data: user, message: "User found." });
    }
    if (account === "oauth") {
      const user = await User.findOne({ account, email, provider });
      res
        .status(200)
        .json({ success: true, data: user, message: "User found." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
