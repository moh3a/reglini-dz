import type { NextApiRequest, NextApiResponse } from "next";
const crypto = require("crypto");
import dbConnect from "../../../../../config/db";
import User from "../../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { token } = req.query;

  if (req.method === "POST") {
    const verifyCredentialsToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    try {
      const user = await User.findOne({
        verifyCredentialsToken,
        verified: false,
      });
      if (!user) {
        res
          .status(200)
          .json({ success: false, message: "No user found with this token." });
      } else if (user) {
        user.verified = true;
        user.verifyCredentialsToken = undefined;
        await user.save();
        res.status(200).json({
          success: true,
          message: "You have been successfully verified.",
          status: 201,
        });
      }
    } catch (error) {
      throw error;
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
