import dbConnect from "../../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import { getSession } from "next-auth/client";
import { IUser } from "../../../types/userType";

import sendEmail from "../../../utils/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
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
        const data = await User.deleteOne({
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
        const message = `
          <h1>Sorry to see you go.</h1>
          <p>Your account have been successfully deleted.</p>
          `;
        await sendEmail({
          from: process.env.SENDGRID_FROM,
          to: email,
          subject: "Account deleted",
          text: message,
        });
        res.status(200).json({
          success: true,
          message: "Account successfully deleted.",
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist." });
  }
}
