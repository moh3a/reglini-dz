// Get recommended product information stream
// https://developers.aliexpress.com/en/doc.htm?docId=60366&docType=2

require("dotenv").config();
import nc from "next-connect";
import axios from "axios";
import type { NextApiResponse } from "next";
import { IExtendedAPIRequest } from "../../../../utils/types";

const handler = nc();
handler.post(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
  const { data } = await axios.get("https://oauth.aliexpress.com/authorize", {
    params: {
      response_type: "code",
      client_id: "33448636",
      sp: "ae",
      state: "moh3a",
      redirect_uri: "http://localhost:3000/api/aliexpress/auth/callback",
    },
  });
  res.status(200).json({ data });
});

export default handler;

// ?response_type=code&client_id=33448636&sp=ae&redirect_uri=http://localhost:3000/api/aliexpress/auth/callback&state=moh3a
