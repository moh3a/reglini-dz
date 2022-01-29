// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import type { NextApiResponse, NextApiRequest } from "next";
import Currency from "../../../../../models/Currency";
import Finance from "../../../../../models/Finance";
import {
  IAEAffiliateProductsResponse,
  IAEError,
} from "../../../../../utils/AETypes";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_AFFILIATE_APP_KEY,
  appsecret: process.env.ALIEXPRESS_AFFILIATE_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { keywords, page } = req.body;
    const rate = await Currency.findOne({ exchange: "DZDEUR" }).select("live");
    const commission = await Finance.findOne().select("commission");
    try {
      client.execute(
        "aliexpress.affiliate.product.query",
        {
          category_ids: keywords ? "" : "6,7,36,390501,44,200001187",
          fields: "commission_rate,sale_price",
          keywords,
          // max_sale_price: "50000",
          // min_sale_price: "5000",
          page_no: page ? page : "1",
          page_size: "50",
          // platform_product_type: "ALL",
          target_currency: "USD",
          target_language: "FR",
          tracking_id: "reglinidz",
          ship_to_country: "DZ",
        },
        function (error: IAEError, response: IAEAffiliateProductsResponse) {
          if (!error) {
            res.status(200).json({
              success: true,
              data: response.resp_result.result,
              rate: rate.live.parallel.sale,
              commission: commission.commission,
            });
          } else res.status(200).json({ success: false, error });
        }
      );
    } catch (error: any) {
      res.status(200).json({ success: false, error });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
