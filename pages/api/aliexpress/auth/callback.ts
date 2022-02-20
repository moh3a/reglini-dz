require("dotenv").config();
import axios from "axios";
import nc from "next-connect";
import type { NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

import User from "../../../../models/User";
import { IExtendedAPIRequest } from "../../../../types";
import CheckSession from "../../../../utils/checkSession";
import dbConnect from "../../../../config/db";

const handler = nc({ attachParams: true });
handler
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(async (req: IExtendedAPIRequest, res: NextApiResponse, next) =>
    CheckSession(req, res, next)
  )
  .get(async (req: IExtendedAPIRequest, res: NextApiResponse) => {
    const { code } = req.query;
    if (code) {
      const { data } = await axios.post(
        `https://oauth.aliexpress.com/token?client_id=${process.env.ALIEXPRESS_DS_APP_KEY}&client_secret=${process.env.ALIEXPRESS_DS_APP_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${process.env.NEXTAUTH_URL}/api/aliexpress/auth/callback&sp=ae`
      );
      console.log(data);
      if (data.access_token) {
        const token = jwt.sign(
          {
            session: data,
          },
          process.env.JWT_SECRET
        );
        const user_with_access_token = await User.findOne({
          "aeCredentials.user_id": data.user_id,
        });
        if (user_with_access_token) {
          user_with_access_token.aeCredentials = {
            token,
            user_id: data.user_id,
            user_nick: data.user_nick,
            expire_time: data.expire_time,
          };
          await user_with_access_token.save();
        } else {
          const user = await User.findOne({
            email: req.userData.email,
            account: req.userData.account,
            provider: req.userData.provider,
          });
          user.aeCredentials = {
            token,
            user_id: data.user_id,
            user_nick: data.user_nick,
            expire_time: data.expire_time,
          };
          await user.save();
        }
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
