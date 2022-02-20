require("dotenv").config();
import dbConnect from "../../../../../config/db";
import { TopClient } from "../../../../../lib/api/topClient";
import type { NextApiResponse, NextApiRequest } from "next";

import { IAEError } from "../../../../../types/AETypes";

export interface IAECategoriesResponse {
  resp_result: {
    resp_code: number;
    resp_msg: string;
    result: {
      categories: {
        category: [
          {
            category_id: number;
            category_name: string;
            parent_category_id: number;
          }
        ];
      };
      total_result_count: number;
    };
  };
}

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
    client.execute(
      "aliexpress.affiliate.category.get",
      {
        // app_signature: "moh3a",
      },
      function (error: IAEError, response: IAECategoriesResponse) {
        if (!error) {
          if (response.resp_result.resp_code === 200) {
            let categories: any[] = [];
            response.resp_result.result.categories.category.map((c) => {
              if (!c.parent_category_id) {
                categories.push({
                  category_id: c.category_id,
                  category_name: c.category_name,
                  category_children: [],
                });
              }
            });
            response.resp_result.result.categories.category.map((c) => {
              if (c.parent_category_id) {
                const index = categories.findIndex(
                  (e) => e.category_id === c.parent_category_id
                );
                categories[index].category_children?.push({
                  category_id: c.category_id,
                  category_name: c.category_name,
                });
              }
            });
            res.status(200).json({ success: true, data: categories });
          }
        } else res.status(200).json({ success: false, error });
      }
    );
  } else {
    res.status(400).json({ message: "Page doesn't exist.", success: false });
  }
}
