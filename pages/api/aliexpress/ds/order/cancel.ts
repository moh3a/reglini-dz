require("dotenv").config();
import nc from "next-connect";
import type { NextApiResponse } from "next";

import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import { IAEError } from "../../../../../utils/AETypes";
import { IExtendedAPIRequest } from "../../../../../utils/types";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id }: { id: string } = req.body;

    const user = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });

    if (!user)
      res.status(400).json({ success: false, message: "User does not exist" });

    try {
      client.execute(
        "aliexpress.miniapp.order.cancel",
        {
          session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
          trade_order_id: id,
        },
        function (error: IAEError, response: any) {
          if (!error) console.log(response);
          else console.log(error);
        }
      );
    } catch (error: any) {
      res.status(500).json({ error, success: false });
    }
  });

export default handler;
