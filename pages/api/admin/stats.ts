import type { NextApiResponse } from "next";
import nc from "next-connect";

import dbConnect from "../../../config/db";
import User from "../../../models/User";
import Currency from "../../../models/Currency";
import Finance from "../../../models/Finance";
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
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    try {
      const currency = await Currency.findOne({ exchange: "DZDEUR" }).select(
        "live"
      );
      const finance = await Finance.findOne();
      res.status(200).json({
        success: true,
        data: {
          finance,
          rate: currency,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

export default handler;
