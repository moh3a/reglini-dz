// Commodity information query
// https://developers.aliexpress.com/en/doc.htm?docId=60452&docType=2
require("dotenv").config();
const jwt = require("jsonwebtoken");
import nc from "next-connect";
import type { NextApiResponse } from "next";
import { getSession } from "next-auth/client";

import { TopClient } from "../../../../../lib/api/topClient";
import User from "../../../../../models/User";
import dbConnect from "../../../../../config/db";
import { IExtendedAPIRequest, IUser } from "../../../../../utils/types";
import { IAEError, IDSapiProductDetails } from "../../../../../utils/AETypes";

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
  .post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { id, locale } = req.body;
    const session: IUser | null = await getSession({ req });
    let aesession: any;
    try {
      if (session && session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const user = await User.findOne({
          email,
          account,
          provider: provider || undefined,
        });
        if (user.aeCredentials && user.aeCredentials.token) {
          const decoded = jwt.verify(
            user.aeCredentials.token,
            process.env.JWT_SECRET
          );
          aesession = decoded.session;
          client.execute(
            "aliexpress.ds.product.get",
            {
              session: aesession.access_token,
              product_id: id,
              ship_to_country: "DZ",
              target_currency: "EUR",
              target_language: locale,
            },
            function (error: IAEError, response: IDSapiProductDetails) {
              if (!error) {
                if (response.rsp_code === "200") {
                  res.status(200).json({
                    success: true,
                    data: response.result,
                    dropshipper: false,
                    message: "Successfully retrieved product details.",
                  });
                }
              } else console.log(error);
            }
          );
        } else {
          client.execute(
            "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
            {
              session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
              local_country: "DZ",
              local_language: locale,
              product_id: id,
            },
            function (error: IAEError, response: any) {
              if (!error) {
                res.status(200).json({
                  success: true,
                  data: response.result,
                  dropshipper: true,
                  message: "Successfully retrieved product details.",
                });
              } else console.log(error);
            }
          );
        }
      } else {
        client.execute(
          "aliexpress.postproduct.redefining.findaeproductbyidfordropshipper",
          {
            session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
            local_country: "DZ",
            local_language: locale,
            product_id: id,
          },
          function (error: IAEError, response: any) {
            if (!error) {
              res.status(200).json({
                success: true,
                data: response.result,
                dropshipper: true,
                message: "Successfully retrieved product details.",
              });
            } else console.log(error);
          }
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  });

export default handler;
