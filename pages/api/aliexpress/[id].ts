require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { locale } = req.body;

  if (req.method === "POST") {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.zapiex.com/v3/product/details",
        data: {
          productId: id,
          currency: "EUR",
          shipTo: "DZ",
          locale,
          shipFrom: "CN",
          getHtmlDescription: true,
          getShipping: true,
          getSellerDetails: true,
        },
        headers: {
          "x-api-key": process.env.ZAPIEX_KEY,
        },
      });
      res.status(200).json({ success: true, data: data.data });
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}