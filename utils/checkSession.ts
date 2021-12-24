import dbConnect from "../config/db";
import type { NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import mongoose from "mongoose";
import Cookies from "js-cookie";

import User from "../models/User";
import { IUser, IExtendedAPIRequest } from "./types";

const CheckSession = async (
  req: IExtendedAPIRequest,
  res: NextApiResponse,
  next: any
) => {
  if (!mongoose.connection.readyState) {
    await dbConnect();
  }
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
      Cookies.remove("_Secure-next-auth.callback-url");
      Cookies.remove("_Secure-next-auth.session-token");
      Cookies.remove("_Secure-next-auth.csrf-token");
      res.status(200).json({
        message: "No user was found.",
        success: false,
      });
    } else if (data) {
      req.userData = { email, account, provider: provider || undefined };
      next();
    }
  }
};

export default CheckSession;
