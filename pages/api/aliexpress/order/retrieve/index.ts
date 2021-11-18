require("dotenv").config();
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getSession } from "next-auth/client";

import User from "../../../../../models/User";
import { IUser } from "../../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });

  if (req.method === "POST") {
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        const email = session.user.email;
        const account = session.user.type;
        let provider: IUser["user.provider"];
        if (account === "oauth") {
          provider = session.user.provider;
        }
        const user = await User.findOne({
          account,
          email,
          provider: provider || undefined,
        });
        if (!user)
          res
            .status(400)
            .json({ success: false, message: "User does not exist" });
        axios({
          method: "POST",
          url: "https://api.zapiex.com/v3/order/list",
          headers: {
            "x-api-key": process.env.ZAPIEX_KEY,
          },
          data: {
            username: process.env.ALIEXPRESS_USERNAME,
            password: process.env.ALIEXPRESS_PASSWORD,
            //   page: 1,
            //   orderStatus:'ALL',
            //   timeRange:'ALL'
          },
        })
          .then((response) => {
            let data = response;
            console.log(data);
            res.status(200).json({
              success: true,
              message: "Successfully retrieved all orders.",
              data,
            });
          })
          .catch((err) => {
            res.status(400).json({ success: false, message: err });
          });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}
