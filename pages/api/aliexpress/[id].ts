require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.zapiex.com/v3/product/details",
        data: {
          productId: id,
          currency: "EUR",
          shipTo: "DZ",
          shipFrom: "CN",
          getHtmlDescription: true,
          getShipping: true,
          getSellerDetails: true,
        },
        headers: {
          "x-api-key": process.env.ZAPIEX_KEY,
        },
      });
      res.status(200).json({ success: true, data: data.data, status: 200 });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "server error", success: false, status: 500 });
    }
  } else {
    res
      .status(400)
      .json({ message: "Page doesn't exist.", succes: false, status: 400 });
  }
}
