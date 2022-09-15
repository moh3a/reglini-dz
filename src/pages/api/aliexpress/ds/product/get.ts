// Get recommended product information stream
// https://developers.aliexpress.com/en/doc.htm?docId=60366&docType=2

require("dotenv").config();
const jwt = require("jsonwebtoken");
import nc from "next-connect";
import type { NextApiResponse } from "next";

import { TopClient } from "../../../../../../lib/api/topClient";
import User from "../../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import dbConnect from "../../../../../../config/db";
import { IExtendedAPIRequest } from "../../../../../types";

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
    let session: any;
    try {
      const user = await User.findOne({
        email: req.userData.email,
        account: req.userData.account,
        provider: req.userData.provider,
      });
      const decoded = jwt.verify(
        user.aeCredentials.token,
        process.env.JWT_SECRET
      );
      session = decoded.session;
      client.execute(
        "aliexpress.ds.recommend.feed.get",
        {
          session: session.access_token,
          country: "DZ",
          target_currency: "EUR",
          target_language: "EN",
          sort: "DSRratingAsc",
          feed_name: "toy",
        },
        function (error: any, response: any) {
          if (!error) {
            console.log(response);
            // res.status(200).json({
            //   success: true,
            //   data: response,
            //   message: "Successfully retrieved recommended products.",
            // });
          } else console.log(error);
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  });

export default handler;
