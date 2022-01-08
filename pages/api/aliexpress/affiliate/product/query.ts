// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";

import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_APP_SECRET,
});

const handler = nc();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    client.execute(
      "aliexpress.affiliate.product.query",
      {
        app_signature: "asdasdasdsa",
        category_ids: "2",
        // fields: "commission_rate,sale_price",
        // keywords: "mp3",
        // max_sale_price: "100",
        // min_sale_price: "15",
        page_no: "1",
        page_size: "50",
        platform_product_type: "ALL",
        // sort: "SALE_PRICE_ASC",
        target_currency: "EUR",
        target_language: "FR",
        tracking_id: "reglinidz",
        ship_to_country: "DZ",
        // delivery_days: "3",
      },
      function (error: any, response: any) {
        if (!error) {
          res.status(200).json({
            success: true,
            data: response.resp_result,
            message: "YEESS!!!",
          });
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
