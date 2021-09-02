import type { NextApiRequest, NextApiResponse } from "next";
const crypto = require("crypto");
import dbConnect from "../../../../config/db";
import User from "../../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { token } = req.query;
  if (req.method === "PUT") {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    try {
      // 'new' expression, whose target lacks a construct signature in TypeScript
      // that's why i added (User as any) type
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        res.status(400).json({ message: "Invalid reset token." });
      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res
        .status(201)
        .json({ success: true, data: "Password reset success.", status: 201 });
    } catch (error) {
      throw error;
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
