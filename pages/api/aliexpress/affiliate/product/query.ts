// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

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
  const { keywords } = req.body;
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
      function (error: any, response: any) {
        if (!error) {
          let data: any[] = [];
          response.resp_result.result.products.product.map((product: any) => {
            data.push({
              productId: product.product_id,
              imageUrl: product.product_main_image_url,
              price: product.target_app_sale_price,
              currency: product.target_app_sale_price_currency,
              productCategory: product.second_level_category_name
                ? product.second_level_category_name
                : product.first_level_category_name,
            });
          });

          res.status(200).json({
            success: true,
            data, //: response.resp_result.result,
          });
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
