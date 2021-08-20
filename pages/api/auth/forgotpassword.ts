import dbConnect from "../../../config/db";

import type { NextApiRequest, NextApiResponse } from "next";

import User from "../../../models/User";
import sendEmail from "../../../utils/sendEmail";
import ErrorResponse from "../../../utils/errorResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email, account: "credentials" });

      if (!user) {
        res
          .status(200)
          .json({
            message: "No user with this email address.",
            success: false,
          });
      } else {
        // GENERATE A TOKEN FROM THE USER MODEL
        // SAVE IT IN THE DATABASE
        const token = user.getResetPasswordToken();
        await user.save();
        // REDIRECT TO THE FRONTEND WITH A MESSAGE
        const envUrl = process.env.NEXTAUTH_URL;
        const resetUrl = `${envUrl}/resetpassword/${token}`;
        const message = `
          <h1>Your have requested a password reset</h1>
          <p>Please go to <a href=${resetUrl} clicktracking=off>this link</a> to reset the password.</p>
          `;
        // SEND AN EMAIL FOR THE PASSWORD RESET
        try {
          await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message,
          });
          res.status(200).json({
            success: true,
            data: "Email successfully sent.",
            status: 200,
          });
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          await user.save();
          res.status(500).json({ message: "Error with sending the message." });
        }
      }
    } catch (error) {
      throw error;
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", status: 400 });
  }
}
