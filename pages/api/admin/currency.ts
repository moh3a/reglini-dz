import type { NextApiResponse } from "next";
import nc from "next-connect";

import User from "../../../models/User";
import Currency from "../../../models/Currency";
import CheckSession from "../../../utils/checkSession";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler
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
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    const { exchange, live } = req.body;
    const data = await Currency.findOne({ exchange });
    if (!data)
      res
        .status(404)
        .json({ success: false, message: "Currency doesnt exist" });

    const parallelsalerate =
      Math.round((live.parallel.sale / data.live.parallel.sale) * 100) / 100;
    const parallelpurchaserate =
      Math.round((live.parallel.purchase / data.live.parallel.purchase) * 100) /
      100;

    data.historical.push(live);
    data.live = {
      time: live.time,
      rate: {
        parallelsalerate,
        parallelpurchaserate,
      },
      official: live.official,
      parallel: live.parallel,
    };
    await data.save();
    res.status(201).json({
      success: true,
      message: "Daily rates successfully updated.",
      data,
    });
  });

export default handler;
