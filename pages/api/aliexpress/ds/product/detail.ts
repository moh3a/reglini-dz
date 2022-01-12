// Commodity information query
// https://developers.aliexpress.com/en/doc.htm?docId=60452&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";

import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
});

const handler = nc();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    client.execute(
      "aliexpress.ds.product.get",
      {
        ship_to_country: "DZ",
        product_id: "32982857990",
        target_currency: "EUR",
        target_language: "EN",
      },
      function (error: any, response: any) {
        if (!error) {
          res.status(200).json({
            success: true,
            data: response,
            message: "Successfully retrieved recommended products.",
          });
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
