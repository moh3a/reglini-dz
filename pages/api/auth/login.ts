import dbConnect from "../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../models/User";
import sendToken from "../../../utils/sendToken";
import ErrorResponse from "../../../utils/errorResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return new ErrorResponse("Please provide an email and a password.", 400);
    }

    try {
      const user = await User.findOne({ email }).select("+password");
      // IF THE USER WAS NOT FOUND
      if (!user) {
        return new ErrorResponse("Invalid credentials.", 401);
      }

      // COMPARE THE PASSWORDS IF IT MATCHES
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        return new ErrorResponse("Invalid credentials.", 401);
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
