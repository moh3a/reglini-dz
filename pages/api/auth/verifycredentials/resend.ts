import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import dbConnect from "../../../../config/db";
import User from "../../../../models/User";
import SendEmail from "../../../../utils/sendEmail";
import { IUser } from "../../../../types/userType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
    if (session && session.user) {
      const email = session.user.email;
      const user = await User.findOne({
        email,
        account: "credentials",
        verified: false,
      });
      if (!user)
        res.status(200).json({ success: false, message: "No user was found." });
      user.verifyCredentialsToken = undefined;
      const token = user.verifySignUpCredentials();
      await user.save();
      const url = `${process.env.NEXTAUTH_URL}/profile/verify/${token}`;
      const message = `
      <h1>Hello ${user.name},</h1>
      <p>In order to verify your account, you can simply follow <a href=${url} target='_blank' clicktracking='off'>this link</a>.</p>
    `;
      await SendEmail({
        from: process.env.SENDGRID_FROM,
        to: email,
        subject: "Account Verification",
        text: message,
      });
      res.status(200).json({
        success: true,
        message: "Verification email was successfully resent.",
      });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
