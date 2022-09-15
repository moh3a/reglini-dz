require("dotenv").config();
import type { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Cookies from "js-cookie";

import dbConnect from "../../../../config/db";
import User from "../../../../models/User";
import { IExtendedAPIRequest, IUser } from "../../../types";

export default async function handler(
  req: IExtendedAPIRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const session: IUser | null = await getSession({ req });
    if (!session) {
      res.status(403).json({ message: "Unauthorized to access this part." });
    } else if (session.user) {
      const email = session.user.email;
      const account = session.user.type;
      let provider: IUser["user.provider"];
      if (account === "oauth") {
        provider = session.user.provider;
      }
      const data = await User.findOne({
        account,
        email,
        provider: provider || undefined,
      });
      if (!data) {
        Cookies.remove("next-auth.session-token");
        Cookies.remove("next-auth.csrf-token");
        Cookies.remove("next-auth.callback-url");
        Cookies.remove("__Secure-next-auth.callback-url");
        Cookies.remove("__Secure-next-auth.session-token");
        Cookies.remove("__Host-next-auth.csrf-token");
        res.status(200).json({
          message: "No user was found.",
          success: false,
        });
      } else if (data) {
        req.userData = { email, account, provider: provider || undefined };
        res.status(200).json({ success: true, data, message: "User found." });
      }
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
