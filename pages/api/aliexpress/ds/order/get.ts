// get products
// https://developers.aliexpress.com/en/doc.htm?docId=45803&docType=2

require("dotenv").config();
import { TopClient } from "../../../../../lib/api/topClient";
import nc from "next-connect";
import type { NextApiResponse, NextApiRequest } from "next";
import { IAEError } from "../../../../../utils/AETypes";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_AFFILIATE_APP_KEY,
  appsecret: process.env.ALIEXPRESS_AFFILIATE_APP_SECRET,
  REST_URL: process.env.ALIEXPRESS_API_URL,
});

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId } = req.body;
  try {
    client.execute(
      "aliexpress.ds.trade.order.get",
      {
        order_id: "10000001",
      },
      (error: IAEError, response: any) => {
        if (!error) console.log(response);
        else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
