import type { NextApiResponse } from "next";
import nc from "next-connect";
import dbConnect from "../../../../config/db";

import User from "../../../../models/User";
import Finance from "../../../../models/Finance";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../types";

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
    const { commission } = req.body;
    const data = await Finance.findOne();
    if (!data)
      res.status(404).json({ success: false, message: "No commission set." });

    data.commission = commission;
    await data.save();
    res.status(201).json({
      success: true,
      message: "New commission percentage successfully set.",
      data,
    });
  });

export default handler;
