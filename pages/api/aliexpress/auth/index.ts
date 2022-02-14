require("dotenv").config();
import nc from "next-connect";
import axios from "axios";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(
    `https://oauth.aliexpress.com/authorize?response_type=code&client_id=${process.env.ALIEXPRESS_DS_APP_KEY}&sp=ae&redirect_uri=${process.env.NEXTAUTH_URL}/api/aliexpress/auth/callback`
  );
  if (response.config.url) {
    res.status(200).json({ success: true, data: response.config.url });
  } else {
    res.status(200).json({ success: false });
  }
});

export default handler;
