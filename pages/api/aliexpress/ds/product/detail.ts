// Commodity information query
// https://developers.aliexpress.com/en/doc.htm?docId=60452&docType=2
require("dotenv").config();
const jwt = require("jsonwebtoken");
import nc from "next-connect";
import type { NextApiResponse } from "next";

import { TopClient } from "../../../../../lib/api/topClient";
import User from "../../../../../models/User";
import CheckSession from "../../../../../utils/checkSession";
import dbConnect from "../../../../../config/db";
import { IExtendedAPIRequest } from "../../../../../utils/types";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
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
    const { id, locale } = req.body;
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
        "aliexpress.ds.product.get",
        // "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
        {
          session: session.access_token,
          country: "DZ",
          target_currency: "EUR",
          target_language: locale,
          // local_country: "DZ",
          // local_language: locale,
          product_id: id,
        },
        function (error: any, response: any) {
          if (!error) {
            if (response.rsp_code === "200") {
              res.status(200).json({
                success: true,
                data: response.result,
                message: "Successfully retrieved recommended products.",
              });
            } else {
              console.log(response);
            }
          } else console.log(error);
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  });

export default handler;
