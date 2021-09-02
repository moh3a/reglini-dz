import dbConnect from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      const user = await User.create({
        username,
        email,
        password,
        cart: {},
      });
      let token = user.getSignedToken();
      const data = await User.findOne({ email });
      res.status(201).json({
        success: true,
        token,
        data,
        message: "New user has been registered.",
        status: 201,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error.message, status: 500 });
    }
  }
  //
  else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
