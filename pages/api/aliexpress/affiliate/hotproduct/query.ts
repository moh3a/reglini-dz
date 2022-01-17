// get get hotporudcts
// https://developers.aliexpress.com/en/doc.htm?docId=45794&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";
import { unslugify } from "unslugify";
import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";

import Currency from "../../../../../models/Currency";
import Finance from "../../../../../models/Finance";
import {
  IAEAffiliateProductDetailsResponse,
  IAEError,
} from "../../../../../utils/AETypes";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_AFFILIATE_APP_KEY,
  appsecret: process.env.ALIEXPRESS_AFFILIATE_APP_SECRET,
});

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
        function (err: IAEError, result: any) {
          if (!err) {
            let categories: string = "";
            if (result.resp_result.resp_code === 200) {
              result.resp_result.result.categories.category.map((c: any) => {
                if (!c.parent_category_id) {
                  categories += c.category_id + ",";
                }
              });
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
                } else console.log(error);
              }
            );
          } else console.log(err);
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
          } else console.log(error);
        }
      );
    }
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
