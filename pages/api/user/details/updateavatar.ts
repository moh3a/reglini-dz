require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { getSession } from "next-auth/client";

import User from "../../../../models/User";
import { IUser } from "../../../../utils/types";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session: IUser | null = await getSession({ req });
  try {
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
        res.status(200).json({
          message: "No user was found.",
          success: false,
        });
      }

      const { picture } = req.body;
      data.picture = picture;
      await data.save();
      res.status(200).json({
        success: true,
        message: "Profile picture successfully update.",
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
