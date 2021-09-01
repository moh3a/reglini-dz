import type { NextApiRequest, NextApiResponse } from "next";
import SendEmail from "../../../utils/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { subject, message } = req.body;
    const to = "support@reglini-dz.com";
    const from = "moh3a@reglini-dz.com";
    const text = `<h3>A client in reglini.dz have sent this email.</h3><div>${message}</div>`;
    try {
      SendEmail({ from, to, subject, text });
      res.status(200).json({ message: "Email successfully sent." });
    } catch (error) {
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
