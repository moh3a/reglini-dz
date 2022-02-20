// get get hotporudcts
// https://developers.aliexpress.com/en/doc.htm?docId=45794&docType=2

require("dotenv").config();
import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import type { NextApiResponse, NextApiRequest } from "next";

import Currency from "../../../../../models/Currency";
import Finance from "../../../../../models/Finance";
import {
  IAEAffiliateProductDetailsResponse,
  IAEError,
} from "../../../../../types/AETypes";

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
    const { search, category, locale } = req.body;

    const rate = await Currency.findOne({ exchange: "DZDEUR" }).select("live");
    const commission = await Finance.findOne().select("commission");

    try {
      if (!category) {
        client.execute(
          "aliexpress.affiliate.category.get",
          {
            // app_signature: "moh3a",
          },
          function (errorCategory: IAEError, responseCategory: any) {
            if (!errorCategory) {
              let categories: string = "";
              if (responseCategory.resp_result.resp_code === 200) {
                responseCategory.resp_result.result.categories.category.map(
                  (c: any) => {
                    if (!c.parent_category_id) {
                      categories += c.category_id + ",";
                    }
                  }
                );
              }

              client.execute(
                "aliexpress.affiliate.hotproduct.query",
                {
                  // app_signature: "moh3a",
                  category_ids: categories,
                  fields: "app_sale_price,shop_id",
                  // keywords: search && search.length > 0 ? unslugify(search) : "",
                  // max_sale_price: "33333",
                  // min_sale_price: "22222",
                  page_no: "1",
                  page_size: "50",
                  // platform_product_type: "TMALL",
                  // sort: "SALE_PRICE_ASC",
                  target_currency: "USD",
                  target_language: "FR",
                  tracking_id: "reglinidz",
                  ship_to_country: "DZ",
                },
                function (
                  errorHP: IAEError,
                  responseHP: IAEAffiliateProductDetailsResponse
                ) {
                  if (!errorHP) {
                    res.status(200).json({
                      success: true,
                      data: responseHP.resp_result.result,
                      rate: rate.live.parallel.sale,
                      commission: commission.commission,
                    });
                  } else
                    res.status(200).json({ success: false, error: errorHP });
                }
              );
            } else
              res.status(200).json({ success: false, error: errorCategory });
          }
        );
      } else {
        client.execute(
          "aliexpress.affiliate.hotproduct.query",
          {
            // app_signature: "moh3a",
            category_ids: category,
            fields: "app_sale_price,shop_id",
            // keywords: search && search.length > 0 ? unslugify(search) : "",
            // max_sale_price: "33333",
            // min_sale_price: "22222",
            page_no: "1",
            page_size: "50",
            // platform_product_type: "TMALL",
            // sort: "SALE_PRICE_ASC",
            target_currency: "EUR",
            target_language: "FR",
            tracking_id: "reglinidz",
            ship_to_country: "DZ",
          },
          function (
            error: IAEError,
            response: IAEAffiliateProductDetailsResponse
          ) {
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
      }
    } catch (error: any) {
      res.status(200).json({ success: false, error });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
