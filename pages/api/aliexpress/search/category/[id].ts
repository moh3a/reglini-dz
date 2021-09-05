require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { id } = req.query;
  if (req.method === "GET") {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://api.zapiex.com/v3/search",
        data: {
          searchCategoryId: id,
          moreThanFourStarsOnly: true,
          sort: "BEST_MATCH",
          currency: "EUR",
          shipFrom: "CN",
          shipTo: "DZ",
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
