require("dotenv").config();
import Cookies from "js-cookie";
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
    const user = await User.findOne({
      account,
      email,
      provider: account === "oauth" ? provider : undefined,
    });
    if (!user) {
      Cookies.remove("next-auth.session-token");
      Cookies.remove("next-auth.csrf-token");
      Cookies.remove("next-auth.callback-url");
      Cookies.remove("_Secure-next-auth.callback-url");
      Cookies.remove("_Secure-next-auth.session-token");
      Cookies.remove("_Secure-next-auth.csrf-token");
      res.status(200).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, data: user, message: "User found." });
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
