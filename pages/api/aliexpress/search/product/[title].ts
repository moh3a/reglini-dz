require("dotenv").config();
import type { NextApiResponse } from "next";
import axios from "axios";
import nc from "next-connect";
import { unslugify } from "unslugify";
import { IExtendedAPIRequest } from "../../../../../utils/types";

const handler = nc();
handler.post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
  let { title } = req.query;
  let { locale } = req.body;
  title = unslugify(title);

  await axios({
    method: "POST",
    url: "https://api.zapiex.com/v3/search",
    data: {
      text: title,
      locale: locale ? locale : "en_US",
      moreThanFourStarsOnly: true,
      sort: "BEST_MATCH",
      currency: "EUR",
      shipFrom: "CN",
      shipTo: "DZ",
    },
    headers: {
      "x-api-key": process.env.ZAPIEX_KEY,
    },
  })
    .then((result) => {
      res.status(200).json({ success: true, data: result.data.data });
    })
    .catch((error) => {
      if (error.response.data.statusCode === 429) {
        console.log(error.response.data);
        res.status(200).json({
          success: false,
          message: "No AliExpress requests available",
        });
      }
    });
});

export default handler;
