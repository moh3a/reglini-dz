// Get recommended product information stream
// https://developers.aliexpress.com/en/doc.htm?docId=60366&docType=2

require("dotenv").config();
import nc from "next-connect";
import type { NextApiResponse } from "next";

import { TopClient } from "../../../../../../lib/api/topClient";
import { IExtendedAPIRequest } from "../../../../../types";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const handler = nc();
handler.post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
  try {
    client.execute(
      "aliexpress.ds.recommend.feed.get",
      {
        session: process.env.ALIEXPRESS_DS_ACCESS_TOKEN,
        country: "DZ",
        target_currency: "USD",
        target_language: "EN",
        sort: "DSRratingAsc",
        feed_name: "toy",
      },
      function (error: any, response: any) {
        if (!error) {
          console.log(response);
          // res.status(200).json({
          //   success: true,
          //   data: response,
          //   message: "Successfully retrieved recommended products.",
          // });
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
