import type { NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../config/db";

import User from "../../../../models/User";
import CheckSession from "../../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../../types";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    if (data.role !== "admin") {
      res.status(200).json({
        success: false,
        message: "Unauthorized to access this part.",
      });
    } else {
      next();
    }
  })
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const users = await User.find({ facebookPages: { $exists: true } }).select(
      "name email picture facebookPages"
    );
    if (!users) {
      res
        .status(400)
        .json({ success: false, message: "No facebook pages exist." });
    } else {
      res.status(200).json({
        success: true,
        data: users,
        message: "Successfully retrieved facebook pages.",
      });
    }
  });

export default handler;
