// get productdetail info
// https://developers.aliexpress.com/en/doc.htm?docId=48595&docType=2

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
      "aliexpress.affiliate.productdetail.get",
      {
        app_signature: "aaaaa",
        fields: "commission_rate,sale_price",
        product_ids: "1005003445214027",
        target_currency: "EUR",
        target_language: "FR",
        tracking_id: "reglinidz",
        country: "DZ",
      },
      function (error: any, response: any) {
        if (!error) {
          res.status(200).json({
            success: true,
            data: response.resp_result.result,
            message: "Successfully retrieved product details.",
          });
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
