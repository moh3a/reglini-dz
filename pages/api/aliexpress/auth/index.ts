require("dotenv").config();
import nc from "next-connect";
import axios from "axios";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = nc();
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(
    `https://oauth.aliexpress.com/authorize?response_type=code&client_id=${process.env.ALIEXPRESS_DS_APP_KEY}&sp=ae&redirect_uri=${process.env.NEXTAUTH_URL}/api/aliexpress/auth/callback`
  );
  res.status(200).json({ data: response.config.url });
});

export default handler;
