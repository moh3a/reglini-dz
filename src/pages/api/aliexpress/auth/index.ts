require("dotenv").config();
import nc from "next-connect";
import axios from "axios";
import type { NextApiResponse, NextApiRequest } from "next";
import { IExtendedAPIRequest } from "../../../../types";
import CheckSession from "../../../../utils/checkSession";
import dbConnect from "../../../../../config/db";
import User from "../../../../../models/User";

const handler = nc();
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) => {
    const data = await User.findOne({
      email: req.userData.email,
      account: req.userData.account,
      provider: req.userData.provider,
    });
    if (data.role !== "admin") {
      res.status(200).json({
        success: false,
        message: "Unauthorized to access this part.",
      });
    } else {
      next();
    }
  })
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
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
