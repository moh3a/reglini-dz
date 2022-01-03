require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import Feedback from "../../models/Feedback";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { rate, message, userInfo } = req.body;
  const feedback = await Feedback.findOne();

  feedback.averageRate =
    Math.round(
      ((feedback.averageRate * feedback.feedbackCount + parseInt(rate)) /
        (feedback.feedbackCount + 1)) *
        100
    ) / 100;
  feedback.feedbackMessages.push({
    userPicture: userInfo.picture,
    userEmail: userInfo.email,
    userName: userInfo.name,
    userRating: rate ? parseInt(rate) : undefined,
    userMessage: message ? message : undefined,
  });
  feedback.feedbackCount++;
  await feedback.save();

  res.status(200).json({ success: true });
});

export default handler;
