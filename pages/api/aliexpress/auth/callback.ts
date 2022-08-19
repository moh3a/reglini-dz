require("dotenv").config();
import axios from "axios";
import nc from "next-connect";
import type { NextApiResponse } from "next";

import { IExtendedAPIRequest } from "../../../../types";
import CheckSession from "../../../../utils/checkSession";
import dbConnect from "../../../../config/db";
import User from "../../../../models/User";

const handler = nc({ attachParams: true });
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
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { code } = req.query;
    if (code) {
      const { data } = await axios.post(
        `https://oauth.aliexpress.com/token?client_id=${process.env.ALIEXPRESS_DS_APP_KEY}&client_secret=${process.env.ALIEXPRESS_DS_APP_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXTAUTH_URL}/api/aliexpress/auth/callback&sp=ae`
      );
      console.log(data);
      if (data.access_token) {
        res.status(200).redirect("/aliexpress");
      } else {
        res.status(403).json({
          success: false,
          message: "Failed to log in AE user.",
        });
      }
    }
  });

export default handler;
