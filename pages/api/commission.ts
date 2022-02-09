import dbConnect from "../../config/db";
import type { NextApiRequest, NextApiResponse } from "next";
import Finance from "../../models/Finance";
import Currency from "../../models/Currency";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const { exchange } = req.body;
    try {
      const commission = await Finance.findOne().select("commission");
      let rate: any;
      if (exchange) {
        rate = await Currency.findOne({
          exchange,
        }).select("live");
      }
      res.status(200).json({
        success: true,
        commission: commission.commission,
        rate: rate ? rate.live.parallel.sale : undefined,
      });
    } catch (e) {
      res
        .status(400)
        .json({ success: false, message: "An error have occured." });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
