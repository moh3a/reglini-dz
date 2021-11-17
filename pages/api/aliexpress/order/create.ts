require("dotenv").config();
import { getSession } from "next-auth/client";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import User from "../../../../models/User";
import { IUser } from "../../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: IUser | null = await getSession({ req });
  const { products, shippingAddress } = req.body;

  if (req.method === "POST") {
    try {
      if (!session) {
        res.status(403).json({ message: "Unauthorized to access this part." });
      } else if (session.user) {
        console.log(products, shippingAddress);
        console.log(
          process.env.ALIEXPRESS_USERNAME,
          process.env.ALIEXPRESS_PASSWORD
        );
        const data = await axios({
          method: "POST",
          url: "https://api.zapiex.com/v3/order/create",
          data: {
            username: process.env.ALIEXPRESS_USERNAME,
            password: process.env.ALIEXPRESS_PASSWORD,
            currency: "EUR",
            products,
            shippingAddress,
          },
          headers: {
            "x-api-key": process.env.ZAPIEX_KEY,
            "Content-Type": "application/json",
          },
        });
        console.log(data);

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
        // user.orders.push();
        // await user.save();
        // res.status(200).json({
        //   success: true,
        //   //   data,
        // });
        console.log(user);
        // res.status(200).json({ success: true, data: data.data });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message, success: false });
    }
  } else {
    res.status(400).json({ message: "Page doesn't exist.", succes: false });
  }
}
