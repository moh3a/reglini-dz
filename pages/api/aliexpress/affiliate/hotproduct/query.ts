// get get hotporudcts
// https://developers.aliexpress.com/en/doc.htm?docId=45794&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";

import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_AFFILIATE_APP_KEY,
  appsecret: process.env.ALIEXPRESS_AFFILIATE_APP_SECRET,
});

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    client.execute(
      "aliexpress.affiliate.hotproduct.query",
      {
        // app_signature: "sssfffxxgggg",
        category_ids: "6,7,36,390501,44,200001187",
        fields: "app_sale_price,shop_id",
        // keywords: "mp3",
        // max_sale_price: "33333",
        // min_sale_price: "22222",
        page_no: "1",
        page_size: "50",
        platform_product_type: "TMALL",
        // sort: "SALE_PRICE_ASC",
        target_currency: "EUR",
        target_language: "FR",
        tracking_id: "reglinidz",
        ship_to_country: "DZ",
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
