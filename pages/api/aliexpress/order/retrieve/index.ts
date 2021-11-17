require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.zapiex.com/v3/order/list",
        data: {
          username: process.env.ALIEXPRESS_USERNAME,
          password: process.env.ALIEXPRESS_PASSWORD,
          //   page: 1,
          //   orderStatus:'ALL',
          //   timeRange:'ALL'
        },
        headers: {
          "x-api-key": process.env.ZAPIEX_KEY,
        },
      });
      console.log(data);
      res.status(200).json({ success: true, data: data.data });
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}
