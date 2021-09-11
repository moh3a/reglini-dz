import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import SendEmail from "../../../utils/sendEmail";
import { IUser } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
    const { subject, message } = req.body;

    try {
      let name: IUser["user.name"],
        email: IUser["user.email"],
        account: IUser["user.type"],
        provider: IUser["user.provider"];

      if (session && session.user) {
        email = session.user.email;
        name = session.user.name;
        account = session.user.type;
        if (account === "oauth") {
          provider = session.user.provider;
        }
      }
      const to = "support@reglini-dz.com";
      const from = "moh3a@reglini-dz.com";
      const userinfo =
        session && session.user
          ? `<h2>User with username ${session.user.name} and email address ${session.user.email} with ${session.user.type} account type sent this email.</h2>`
          : ``;

      const text = `<h3>A client in reglini.dz have sent this email.</h3>${userinfo}<div>${message}</div>`;
      SendEmail({ from, to, subject, text });

      res.status(200).json({ message: "Email successfully sent." });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error.message, success: false, status: 400 });
    }
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", success: false, status: 400 });
  }
}
