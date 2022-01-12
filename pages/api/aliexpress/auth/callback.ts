// Get recommended product information stream
// https://developers.aliexpress.com/en/doc.htm?docId=60366&docType=2

require("dotenv").config();
import { TopClient } from "../../../../lib/api/topClient";

import axios from "axios";
import nc from "next-connect";
import type { NextApiResponse } from "next";
import { IExtendedAPIRequest } from "../../../../utils/types";

const client = new TopClient({
  appkey: process.env.ALIEXPRESS_DS_APP_KEY,
  appsecret: process.env.ALIEXPRESS_DS_APP_SECRET,
});

const handler = nc({ attachParams: true });
handler.post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
  const { code } = req.params;
  try {
    client.execute(
      "taobao.top.auth.token.create",
      {
        code,
        uuid: "moh3a",
      },
      function (error: any, response: any) {
        if (!error) {
          console.log(response);
        } else console.log(error);
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export default handler;
