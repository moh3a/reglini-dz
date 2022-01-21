// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";
import nc from "next-connect";
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
  REST_URL: process.env.NEXTAUTH_URL?.includes("https")
    ? "	https://eco.taobao.com/router/rest"
    : "http://gw.api.taobao.com/router/rest",
});

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { keywords } = req.body;
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
        page_no: "1",
        page_size: "50",
        platform_product_type: "ALL",
        target_currency: "EUR",
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
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;