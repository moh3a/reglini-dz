import dbConnect from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const token = req.headers.authorization;
  // Check for token
  if (!token)
    res.status(401).json({
      message: "No token, authorization denied",
      success: false,
    });
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // Add user from payload
  const { id } = decoded;

  if (req.method === "GET") {
    try {
      const admin = await User.findById(id);
      if (admin.role === "admin") {
        const users = await User.find();
        if (!users) throw Error("No users exist");
        res.status(200).json({ success: true, users, status: 200 });
      } else {
        res.status(401).json({
          success: false,
          message: "Unauthorized to enter admin area.",
          stauts: 401,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
