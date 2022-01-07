import dbConnect from "../../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import slugify from "slugify";

import User from "../../../../models/User";
import { IUser } from "../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
    const { username } = req.body;

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

        data.name = slugify(username);
        await data.save();

        res.status(200).json({
          success: true,
          data,
          message: `Username successfully updated.`,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist." });
  }
}
