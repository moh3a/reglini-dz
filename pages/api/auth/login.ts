import dbConnect from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Please provide an email and a password.");
    }
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw Error("Invalid credentials.");
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        throw Error("Invalid credentials.");
      }
      let token = user.getSignedToken();
      const data = await User.findOne({ email });
      res.status(200).json({
        success: true,
        token,
        data,
        message: "User is logged in.",
        status: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: error.message, status: 500 });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
