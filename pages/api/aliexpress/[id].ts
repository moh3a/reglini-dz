require("dotenv").config();
import type { NextApiResponse } from "next";
import axios from "axios";
import nc from "next-connect";
import { IExtendedAPIRequest } from "../../../utils/types";

const handler = nc();
handler.post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { locale } = req.body;
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
});

export default handler;
