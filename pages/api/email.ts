import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import SendEmail from "../../utils/sendEmail";
import { IUser } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
    const { subject, message, to, from } = req.body;

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
      const userinfo =
        session && session.user
          ? `
          <h2>username: ${session.user.name}</h2>
          <h3>email: ${session.user.email}</h3>
          <h3>account type: ${session.user.type}</h3>`
          : ``;

      const text = `<h3>A client in reglini-dz have sent this email.</h3>${userinfo}<div>${message}</div>`;
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
